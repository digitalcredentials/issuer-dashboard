'use server';

import { auth } from '@/auth';

import { callStore } from '../store';
import * as fastcsv from '@fast-csv/parse';
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

export type State = {
  errors?: {
    templateId?: string[];
    tenantId?: string[];
    csv?: string[];
    batchName?: string[];

  };
  message?: string | null;
  formData: {
    batchName: string | undefined;
    tenantId: string | undefined;
    templateId: string | undefined;
    csv: File | undefined;
  }

};

export async function uploadBatch(prevState: State, formData: FormData) : Promise<any> {

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
    csv: formData.get('csv')
  }
  const validatedFields = FormSchema.safeParse(incomingFormValues);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Credential.',
      formData: incomingFormValues
    };
  }

  // Prepare data for insertion into the database
  const { templateId, batchName, csv, tenantId } = validatedFields.data;
  const batch:[] = [];

  const processRow = (row:any) => {
  /*  1. check the row's data to make sure required fields are there, emails are emails, etc.
    2. add each row to an array, also have to add the templateId and 
    hmmmmmmmmm, will also have to do some kind of lookup of the holder portion to make sure it isn't in the db already??????? like by email?
    ORRRRRRR, maybe do the holder upload separately.
    hmmmmmm, problem I think is if a new holder entry comes in that overwrites an existing entry. do we just overwrite??? or ask to overwrite???
    3. when done, post the array.
    4. add a new endpoint that takes the array, sets up a transaction, inserts the rows with:
    INSERT INTO table_name (column1, column2, column3)
VALUES
(value1_row1, value2_row1, value3_row1),
(value1_row2, value2_row2, value3_row2),
(value1_row3, value2_row3, value3_row3);. */
   }

  Readable.fromWeb(csv.stream() as any)
    .pipe(fastcsv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => processRow(row))
    .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`));

  try {

    const result = await callStore('credential', 'POST', )

  } catch (error) {
    // We'll also log the error to the console for now
    console.error(error);
    return {
      message: 'Database Error: Failed to upload credentials.',
    };
  }

  revalidatePath('/dashboard/credentials');
  redirect('/dashboard/credentials');
}








