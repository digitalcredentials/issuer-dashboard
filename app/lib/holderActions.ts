'use server';
 
import { auth } from '@/auth';

import { callStore } from './store';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  orgId: z.string(),
  name: z.string(),
  did: z.string(),
  email: z.string(),
});
 
const CreateHolder = FormSchema.omit({ id: true });
const UpdateHolder = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    orgId?: string[];
    did?: string[];
    name?: string[];
    email?: string[];
  };
  message?: string | null;
};

export async function createHolder(prevState: State, formData: FormData) {

    const session = await auth(); // Get the current session
    if (!session?.user) {
        throw new Error('You must be signed in to perform this action');
    } 

   const validatedFields = CreateHolder.safeParse({did: formData.get('did'),
    name: formData.get('name'),
    orgId: formData.get('orgId'),
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Holder.',
    };
  }

  const { orgId, email, name, did } = validatedFields.data;
 
  try {
    const result = await callStore('holder', 'POST', {email, name, did, org_id: orgId})
    // TODO: want to directly deal with 404's using notFound()
  } catch (error) {
    // We'll also log the error to the console for now
    console.error(error);
    return {
      message: 'Database Error: Failed to Create Holder.',
    };
  }
 
  revalidatePath('/dashboard/holders');
  redirect('/dashboard/holders');
}


export async function deleteHolder(id: string) {
    // TODO: not sure if we even want to allow deletions
     throw new Error('Deletion not allowed');

 // revalidatePath('/dashboard/holders');
}

export async function updateHolder(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateHolder.safeParse({
    did: formData.get('did'),
    name: formData.get('name'),
    orgId: formData.get('orgId'),
    email: formData.get('email'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Holder.',
    };
  }
 
  const { did, email, name, orgId } = validatedFields.data;
 
  try {
     const result = await callStore(`holder/${id}`, 'PUT', {email, name, org_id: orgId, did})
  } catch (error) {
    return { message: 'Database Error: Failed to update holder.' };
  }
 
  revalidatePath('/dashboard/holders');
  redirect('/dashboard/holders');
}



