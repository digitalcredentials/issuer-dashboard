'use server';

import {  auth } from '@/auth';
import { callStore } from '../store';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { notify } from '../email/notify';

const FormSchema = z.object({
  templateId: z.string({
    invalid_type_error: 'Please select a credential type.',
  }),
  tenantId: z.string({
    invalid_type_error: 'Please select an issuer.',
  }),
  tagId: z.string({
    invalid_type_error: 'Please select a tag.',
  }),
  status: z.enum(['hidden', 'collectable'], {
    invalid_type_error: 'Please select a status (visibility).',
  })
});

export type State = {
  errors?: {
    templateId?: string[];
    tenantId?: string[];
    status?: string[];
    tagId?: string[];
  };
  message?: string | null;
  formData: {
    tenantId: string | undefined;
    status: string | undefined;
    templateId: string | undefined;
    tagId: string | undefined;
  }

};

export async function updateCredentials(credIds: string,prevState: State, formData: FormData) : Promise<any> {
  
  const session = await auth(); // Get the current session
  let userName;
  if (!session?.user) {
    throw new Error('You must be signed in to perform this action');
  } else {
    userName = session.user.email as string
  }

  const incomingFormValues = {
    templateId: formData.get('templateId'),
    tenantId: formData.get('tenantId'),
    tagId: formData.get('tagId'),
    status: formData.get('status')
  }
  const validatedFields = FormSchema.safeParse(incomingFormValues);

  console.log("in the update credentials form action")
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Credential.',
      formData: incomingFormValues
    };
  }

  const { templateId, status, tenantId, tagId } = validatedFields.data;
  // TODO: want to directly deal with 404's using notFound()
  try {
    console.log('about to call the store')
    const result = await callStore('credentials', 'PUT', { cred_ids: credIds, status, cred_template_id: templateId, tenant_id: tenantId, tag_id: tagId, updated_by: userName })
  } catch (error) {
    // We'll also log the error to the console for now
    console.error(error);
    return {
      message: 'Database Error: Failed to Update Credentials.',
    };
  }

  revalidatePath('/dashboard/credentials/grid');
  redirect('/dashboard/credentials/grid');
}

