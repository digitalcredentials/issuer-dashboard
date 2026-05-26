'use server';

import { signIn, auth } from '@/auth';

import { AuthError } from 'next-auth';
import { callStore } from '../store';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { notify } from '../email/notify';

const FormSchema = z.object({
  id: z.string(),
  templateId: z.string({
    invalid_type_error: 'Please select a template.',
  }).refine(val => val !== 'select', {message: 'Please select a template.'}),
  tenantId: z.string({
    invalid_type_error: 'Please select an issuer.',
  }).refine(val => val !== 'select', {message: 'Please select an issuer.'}),
  tagId: z.string({
    invalid_type_error: 'Please select a tag.',
  }).refine(val => val !== 'select', {message: 'Please select a tag.'}),
  status: z.enum(['hidden', 'collectable'], {
    invalid_type_error: 'Please select a status.',
  }),
  credName: z.string().trim().min(1, { message: "A credential description is required" }),
  holderId: z.string().trim().min(1, { message: "You must select a holder" }),
  validFrom: z.preprocess(
  (val) => (val === '' ? null : val),
   z.string().date("Your date must be a valid format - YYYY-MM-DD").nullable()
),
  validUntil: z.preprocess(
  (val) => (val === '' ? null : val),
   z.string().date("Your date must be a valid format - YYYY-MM-DD").nullable()
)

});

const CredentialSchema = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    templateId?: string[];
    tenantId?: string[];
    holderId?: string[];
    tagId?: string[];
    status?: string[];
    credName?: string[];
    validFrom?: string[];
    validUntil?: string[];
  };

  message?: string | null;
  formData: {
    credName: string | undefined;
    tenantId: string | undefined;
    templateId: string | undefined;
    tagId: string | undefined;
    status: string | undefined;
    holderId: string | undefined;
    validFrom: string | undefined ;
    validUntil: string | undefined ;
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
    status: formData.get('status'),
    holderId: formData.get('holderId'),
    validFrom: formData.get('validFrom'),
    validUntil: formData.get('validUntil')
  }
  const validatedFields = CredentialSchema.safeParse(incomingFormValues);

  
  // If form validation fails, return errors. Otherwise, continue.
  if (!validatedFields.success) {
    const returnedDAta = {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Credential.',
      formData: incomingFormValues
    };
    return returnedDAta
  }

  const { templateId, credName, holderId, tenantId, tagId, status, validFrom, validUntil } = validatedFields.data;
  // TODO: want to directly deal with 404's using notFound()
  try {
    // TODO the credType will be used to pick a vc template, populate it, and that populated template will be saved here to the store.
    // TODO move this into the data file
    const result = await callStore('credential', 'POST', { holder_id: holderId, cred_name: credName, cred_template_id: templateId, tenant_id: tenantId, tag_id: tagId, status, valid_from: validFrom, valid_until: validUntil, added_by: userName })

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
    status: formData.get('status'),
    holderId: formData.get('holderId'),
    validFrom: formData.get('validFrom'),
    validUntil: formData.get('validUntil')
  }
  const validatedFields = CredentialSchema.safeParse(incomingFormValues);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Credential.',
      formData: incomingFormValues
    };
  }

  const { templateId, credName, holderId, tenantId, tagId, validFrom, validUntil, status } = validatedFields.data;

  try {
    const result = await callStore(`credential/${id}`, 'PUT', { holder_id: holderId, cred_template_id: templateId, tenant_id: tenantId, tag_id: tagId, cred_name: credName, valid_from: validFrom, valid_until: validUntil, status })
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