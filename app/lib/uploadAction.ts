'use server';

import { auth } from '@/auth';

import { callStore } from './store';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  templateId: z.string({invalid_type_error: 'Please select a credential type.'}),
  tenantId: z.string({ invalid_type_error: 'Please select an issuer.'}),
  batchName: z.string().trim().min(1, { message: "A batch name is required" }),
  csv: z
    .instanceof(File, { message: "Expected a file" })
    .refine((file) => file instanceof File && file.size > 0, {
      message: 'File is required',
    })
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
    csv: formData.get('csv'),
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

  try {

  //  const result = await callStore('credential', 'POST', { holder_id: holderId, cred_name: credName, cred_template_id: templateId, tenant_id: tenantId, added_by: userName })

  } catch (error) {
    // We'll also log the error to the console for now
    console.error(error);
    return {
      message: 'Database Error: Failed to upload credentials.',
    };
  }

  revalidatePath('/dashboard/upload');
  redirect('/dashboard/upload');
}








