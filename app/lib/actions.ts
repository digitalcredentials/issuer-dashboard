'use server';

import { signIn, auth } from '@/auth';

import { AuthError } from 'next-auth';
import { callStore } from './store';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  credTypeId: z.string({
    invalid_type_error: 'Please select a credential type.',
  }),
  status: z.enum(['pending', 'notified', 'revoked', 'collected', 'deactivated'], {
    invalid_type_error: 'Please select a status.',
  }),
  credName: z.string(),
  holder: z.string(),
  email: z.string(),
});

const CreateCredential = FormSchema.omit({ id: true, status: true });
const UpdateCredential = FormSchema.omit({ id: true, status: true });

export type State = {
  errors?: {
    credTypeId?: string[];
    holder?: string[];
    credName?: string[];
    email?: string[];
  };
  message?: string | null;
};

export async function createCredential(prevState: State, formData: FormData) {

  const session = await auth(); // Get the current session
  let userName;
  if (!session?.user) {
    throw new Error('You must be signed in to perform this action');
  } else {
    userName = session.user.email as string
  }

  const validatedFields = CreateCredential.safeParse({
    credTypeId: formData.get('credTypeId'),
    credName: formData.get('credName'),
    holder: formData.get('holder'),
    email: formData.get('email'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Credential.',
    };
  }

  // Prepare data for insertion into the database
  const { credTypeId, email, credName, holder } = validatedFields.data;
  // TODO: want to directly deal with 404's using notFound()
  try {
    // TODO the credType will be used to pick a vc template, populate it, and that populated template will be saved here to the store.
    const result = await callStore('credential', 'POST', { holder_email: email, holder_name: holder, cred_name: credName, added_by: userName })

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


export async function updateCredential(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateCredential.safeParse({
    credTypeId: formData.get('credTypeId'),
    credName: formData.get('credName'),
    holder: formData.get('holder'),
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Credential.',
    };
  }

  const { credTypeId, email, credName, holder } = validatedFields.data;

  try {
    const result = await callStore(`credential/${id}`, 'PUT', { holder_email: email, holder_name: holder, cred_name: credName })
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