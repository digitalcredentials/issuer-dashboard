'use server';

import { auth } from '@/auth';

import { callStore } from '../store';
import { parse } from '@fast-csv/parse';
import { Readable } from 'node:stream';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Holder } from '../definitions';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3;
const ACCEPTED_MIME_TYPES = ["text/csv", "text/comma-separated-values", "text/x-csv", "application/csv", "application/vnd.ms-excel", "text/plain"];

// zod schema object for the form upload
const FormSchema = z.object({
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
  name: z.string().trim().min(1, { message: "A holder name is required" }),
  email: z.string().email().trim().min(1, { message: "A valid email is required" }),
  did: z.string({invalid_type_error: 'The holderDID must be a string.'}),
  org_id: z.string({invalid_type_error: 'The holderOrgId must be a string.'})
});

// the state typing for this action
export type State = {
  errors?: {
    errorType?: 'existing-holders' | 'duplicate-emails' | 'csv-row' | 'network' | 'form' | 'csv-parsing' ;
    formErrors?: {csv?: []};
    message?: string | null;
    existingList: any;
    duplicateList: any;
  };
  formData: {
    csv: File | undefined;
  }
};

    /*  This upload:
    1. Checks the incoming from values against ZOD schema. If errors, return.
    
    2. Processes the CSV and use Zod to check for missing names or missing/bad 
        emails as we process the incoming rows.
  
    After all rows are processed:
  
    3. If there were ZOD errors then returns them.

    4  If there are duplicate emails then returns them:
	
    5.  Calls the store to check for existing emails in the db.
      If duplicates, returns them.
    
    6. sends the holders to the store
 */

export async function uploadHolders(prevState: State, formData: FormData) : Promise<any> {

  const session = await auth(); // Get the current session
  let userName;
  if (!session?.user) {
    throw new Error('You must be signed in to upload credentials.');
  } else {
    userName = session.user.email as string
  }

  const incomingFormValues = {
    csv: formData.get('csv')
  }
  const formValidationResult = FormSchema.safeParse(incomingFormValues);

  // If form validation fails, return errors. Otherwise, continue.
  if (!formValidationResult.success) {
    return {
      errors: {
        errorType: 'form',
        formErrors: formValidationResult.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to process your CSV file.'
      },
      formData: incomingFormValues
    };
  }

  const { csv } = formValidationResult.data;
  const holders:Holder[] = [];
  const rowErrors:any[] = [];

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
        .on('data', row => holders.push(row))
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
      return {
        errors: {
          errorType: 'csv-row',
          rowErrors,
          message: 'Failed to process your CSV file. There were errors with the following rows: '
        },
        formData: incomingFormValues
      };
    }

    // check for email duplicates in the uploaded csv rows
    const emailAddresses : string[] = holders.map(holder=>holder.email);
    const duplicates = emailAddresses.filter((email, index) => {
    			// If the first index of the item is not the current index, it's a duplicate
    			return emailAddresses.indexOf(email) !== index;
		});

    // if duplicates return an error and the list of duplicates
    if (duplicates.length) {
      return {
        errors: {
          errorType: 'duplicate-emails',
          duplicates,
          message: "Couldn't process your CSV file. There are rows with the same email address. Please remove the duplicates and try again. Duplicates: "
        },
        formData: incomingFormValues
    };
    }


   //  check that none of our new email addresses aren't already in the database
  try {

    const result = await callStore('holders/duplicates', 'POST', emailAddresses)
    if (result.length) {
      const existingHolders = result.map((holder:any)=>`${holder.email} - ${holder.name}`)
      return {
        errors: {
          errorType: 'existing-holders',
          existingHolders,
          message: "Holders arleady exist in the database for some of the email addresses you've provided. Please correct and try again. Duplicates: "
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

  // Finally, upload the holders to the store
  try {
    const data = {holders,added_by: userName}
    const result = await callStore('holders', 'POST', data)
    return {
        success: 'Your holders have been added.',
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


  revalidatePath('/dashboard/holders');
  redirect('/dashboard/holders');
}








