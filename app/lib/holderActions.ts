'use server';
 
import { auth } from '@/auth';

import { callStore } from './store';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  orgId: z.string(),
  name: z.string().trim().min(1, { message: "A holder name is required" }),
  did: z.string(),
  email: z.string().trim().min(1, { message: "An email address is required." })
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
  formData: {
    orgId: string | undefined;
    did: string | undefined;
    name: string | undefined;
    email: string | undefined;
    id?: string | undefined;
  }
};

export async function createHolder(prevState: State, formData: FormData) : Promise<any> {
 

    const session = await auth(); // Get the current session
    if (!session?.user) {
        throw new Error('You must be signed in to perform this action');
    } 

    const incomingFormValues = {
      did: formData.get('did'),
      name: formData.get('name'),
      orgId: formData.get('orgId'),
      email: formData.get('email'),
  }

   const validatedFields = CreateHolder.safeParse(incomingFormValues);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Holder.',
      formData: incomingFormValues
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

export async function updateHolder (
  id: string,
  prevState: State,
  formData: FormData,
) : Promise<any>  {

      const incomingFormValues = {
      did: formData.get('did'),
      name: formData.get('name'),
      orgId: formData.get('orgId'),
      email: formData.get('email'),
  }
  const validatedFields = UpdateHolder.safeParse(incomingFormValues) ;
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Holder.',
      formData: incomingFormValues
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



