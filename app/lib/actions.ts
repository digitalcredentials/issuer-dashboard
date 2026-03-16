'use server';

import { signIn, auth } from '@/auth';

import { AuthError } from 'next-auth';
import { callStore } from './store';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { notify } from './email/notify';

const FormSchema = z.object({
  id: z.string(),
  templateId: z.string({
    invalid_type_error: 'Please select a credential type.',
  }),
  tenantId: z.string({
    invalid_type_error: 'Please select an issuer.',
  }),
  tagId: z.string({
    invalid_type_error: 'Please select a tag.',
  }),
  status: z.enum(['hidden', 'collectable', 'revoked'], {
    invalid_type_error: 'Please select a status.',
  }),
  credName: z.string().trim().min(1, { message: "A credential name is required" }),
  holderId: z.string().trim().min(1, { message: "You must select a holder" }),
});

const CreateCredential = FormSchema.omit({ id: true, status: true });
const UpdateCredential = FormSchema.omit({ id: true, status: true });

export type State = {
  errors?: {
    templateId?: string[];
    tenantId?: string[];
    holderId?: string[];
    tagId?: string[];
    credName?: string[];
  };
  message?: string | null;
  formData: {
    credName: string | undefined;
    tenantId: string | undefined;
    templateId: string | undefined;
    tagId: string | undefined;
  }

};

export async function createCredential(prevState: State, formData: FormData) : Promise<any> {

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
    credName: formData.get('credName'),
    holderId: formData.get('holderId'),
  }
  const validatedFields = CreateCredential.safeParse(incomingFormValues);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Credential.',
      formData: incomingFormValues
    };
  }

  // Prepare data for insertion into the database
  const { templateId, credName, holderId, tenantId, tagId } = validatedFields.data;
  // TODO: want to directly deal with 404's using notFound()
  try {
    // TODO the credType will be used to pick a vc template, populate it, and that populated template will be saved here to the store.
    // TODO move this into the data file
    const result = await callStore('credential', 'POST', { holder_id: holderId, cred_name: credName, cred_template_id: templateId, tenant_id: tenantId, tag_id: tagId, added_by: userName })

  } catch (error) {
    // We'll also log the error to the console for now
    console.error(error);
    return {
      message: 'Database Error: Failed to Create Credential.',
    };
  }

  revalidatePath('/dashboard/credentials');
  redirect('/dashboard/credentials');
}


export async function updateCredential (
  id: string,
  prevState: State,
  formData: FormData,
) : Promise<any> {
  const incomingFormValues = {
    templateId: formData.get('templateId'),
    tenantId: formData.get('tenantId'),
    tagId: formData.get('tagId'),
    credName: formData.get('credName'),
    holderId: formData.get('holderId'),
  }
  const validatedFields = UpdateCredential.safeParse(incomingFormValues);

  
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Credential.',
      formData: incomingFormValues
    };
  }

  const { templateId, credName, holderId, tenantId, tagId } = validatedFields.data;

  try {
    const result = await callStore(`credential/${id}`, 'PUT', { holder_id: holderId, cred_template_id: templateId, tenant_id: tenantId, tag_id: tagId, cred_name: credName })
  } catch (error) {
    return { message: 'Database Error: Failed to pdate credential.' };
  }

  revalidatePath('/dashboard/credentials');
  redirect('/dashboard/credentials');
}





export async function deleteCredential(id: string) {
  // TODO: not sure if we even want to allow deletions
  throw new Error('Deletion not allowed');

  // revalidatePath('/dashboard/credentials');
}

export async function notifyHolder(credentialId: string) {
  notify(credentialId);
}


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}