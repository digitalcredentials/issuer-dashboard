'use server';

import { auth } from '@/auth';

import { callStore } from '../store';
import { parse } from '@fast-csv/parse';
import { Readable } from 'node:stream';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3;
const ACCEPTED_MIME_TYPES = ["text/csv", "text/comma-separated-values", "text/x-csv", "application/csv", "application/vnd.ms-excel", "text/plain"];

const FormSchema = z.object({
  templateId: z.string({invalid_type_error: 'Please select a credential type.'}),
  tenantId: z.string({ invalid_type_error: 'Please select an issuer.'}),
  batchName: z.string().trim().min(1, { message: "A batch name is required" }),
  description: z.string().trim().min(1, { message: "A batch description is required" }),
  tagId: z.string().trim().min(1, { message: "A tag is required" }),
  status: z.enum(['hidden', 'collectable'], {
    invalid_type_error: 'Please select a status.',
  }),
  validFrom: z.preprocess(
  (val) => (val === '' ? null : val),
   z.string().date("Your date must be a valid format - YYYY-MM-DD").nullable()
),
  validUntil: z.preprocess(
  (val) => (val === '' ? null : val),
   z.string().date("Your date must be a valid format - YYYY-MM-DD").nullable()
),
  csv: z
    .instanceof(File, { message: "Expected a file" })
    .refine((file) => file instanceof File && file.size > 0, {
      message: 'File is required',
    })
    .refine(
    (file) => file.size <= MAX_UPLOAD_SIZE,
    `File size must be less than 3MB.`
    )
    .refine(
      (file) => ACCEPTED_MIME_TYPES.includes(file.type),
      `Only csv files are supported.`
    )
});



// zod schema object for each csv row
const CsvSchema = z.object({
//  name: z.string().trim().min(1, { message: "A holder name is required" }),
  email: z.string().email().trim().min(1, { message: "A valid email is required" }),
 // did: z.string({invalid_type_error: 'The holderDID must be a string.'}),
 //org_id: z.string({invalid_type_error: 'The holderOrgId must be a string.'})
});


export type State = {
  errors?: {
    errorType?: 'non-existant-holders' | 'csv-row' | 'network' | 'form' | 'csv-parsing' ;
    formErrors?: {
      templateId?: string[];
      tenantId?: string[];
      csv?: string[];
      batchName?: string[];
      description?: string[];
      validFrom?: string[];
      validUntil?: string[];
      status?: string[];
      tagId?: string[];
    },
    missingEmails?: string[]
  };
  message?: string | null;
  formData: {
    batchName: string | undefined;
    description: string | undefined;
    tenantId: string | undefined;
    templateId: string | undefined;
    validFrom: string | undefined;
    validUntil: string | undefined;
    status: string | undefined;
    tagId: string | undefined;
    csv: File | undefined;
  },
  

};

export async function uploadBatch(prevState: State, formData: FormData) : Promise<any> {

  console.log("in the batch upload")
  const session = await auth(); // Get the current session
  let userName;
  if (!session?.user) {
    throw new Error('You must be signed in to upload credentials.');
  } else {
    userName = session.user.email as string
  }

  
  const incomingFormValues = {
    templateId: formData.get('templateId'),
    tenantId: formData.get('tenantId'),
    batchName: formData.get('batchName'),
    description: formData.get('description'),
    csv: formData.get('csv'),
    tagId: formData.get('tagId'),
    validFrom: formData.get('validFrom'),
    validUntil: formData.get('validUntil'),
    status: formData.get('status')
  }
  const formValidationResult = FormSchema.safeParse(incomingFormValues);


    // If form validation fails, return errors. Otherwise, continue.
  if (!formValidationResult.success) {
    console.log("there were errors:", formValidationResult.error.flatten().fieldErrors);
    const errors =  {
      errors: {
        errorType: 'form',
        formErrors: formValidationResult.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to process your CSV file.'
      },
      formData: incomingFormValues
    };
    console.log(errors)
    return errors;
  }

  const { templateId, batchName, csv, tenantId, tagId, validFrom, status, validUntil, description } = formValidationResult.data;
  const uploadedRows:any[] = [];
  const rowErrors:any[] = [];
  let credentials;
    try {
      const result = await new Promise<any>((resolve, reject) => {
        Readable.fromWeb(csv.stream() as any)
          .pipe(parse({ headers: true }))
          .validate((row, cb): void => {
            const result = CsvSchema.safeParse(row);
            if (!result.success) {
              const reason = JSON.stringify(result.error.flatten().fieldErrors)
              return cb(null, false, reason);
            } 
            return cb(null, true);
          })
          .on("data-invalid", (row, rowNumber, reason) => {
              rowErrors.push(`Row #${rowNumber} ${JSON.stringify(row)} - PROBLEM: ${reason}`)      
          })
          .on('data', row => uploadedRows.push(row))
          .on('error', error => reject(error))
          .on('end', (rowCount: number) => resolve({rowCount}))
    });
  } catch (e) {
    console.log("an error with the CSV file parsing")
    return {
          errors: {
            errorType: 'csv-parsing',
            csvError: e,
            message: `Failed to process your CSV file because of error: ${e} `
          },
          formData: incomingFormValues
        };
  }
  
     // check if there were zod errors
     if (rowErrors.length) {
      console.log("zod errors:", rowErrors)
        return {
          errors: {
            errorType: 'csv-row',
            rowErrors,
            message: 'Failed to process your CSV file. There were errors with the following rows: '
          },
          formData: incomingFormValues
        };
      }
  
      // map holder emails to holder ids
      // collect any emails that don't have a holder id
      console.log("about to check for missing emails")
    try {
          const missingEmails:string[] = []
          const holderEmails = uploadedRows.map(row=>row.email)
          const existingHolders = await callStore('holders/ids', 'POST', holderEmails)

          credentials = uploadedRows.map((credRow:any)=>{
              const existingHolder = existingHolders.find((idRow:any)=>idRow.email === credRow.email);
              if (!existingHolder) {
                missingEmails.push(credRow.email);
                return null;
              } else {
                return {...credRow, holder_id: existingHolder.id}
              }
          })

      if (missingEmails.length) {
            return {
              errors: {
                errorType: 'non-existant-holders',
                missingEmails,
                message: 'No holders were found for some of the supplied email addresses,'
          },
              formData: incomingFormValues
          };
          }
    } catch (error) {
      console.error(error);
      return {
        errors: {
          errorType: 'network',
          message: 'Database Error: Problem calling the store.'
        }
      };
    }
  
    // Finally, upload the credentials to the store
    try {
      const data = {credentials, added_by: userName, csv, valid_from: validFrom, valid_until: validUntil, status, tag_id: tagId, template_id: templateId, tenant_id: tenantId, batch_name: batchName, description}
      console.log("about to call the store:")
      console.log(JSON.stringify(data, null, 2))
      const result = await callStore('batch', 'POST', data)
      return {
          success: 'Your credentials have been added.',
          formData: incomingFormValues
      }
    } catch (error) {
      console.error(error);
      return {
        errors: {
          errorType: 'network',
          message: 'Database Error: Problem calling the store.'
        }
      };
    }
  






 





  /* Readable.fromWeb(csv.stream() as any)
    .pipe(fastcsv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => processRow(row))
    .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`));

  try {

    const result = await callStore('credential', 'POST', credsToAdd)

  } catch (error) {
    // We'll also log the error to the console for now
    console.error(error);
    return {
      message: 'Database Error: Failed to upload credentials.',
    };
  } */

  revalidatePath('/dashboard/credentials');
  redirect('/dashboard/credentials');
}








