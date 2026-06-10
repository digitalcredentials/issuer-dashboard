'use server';
 
import { auth } from '@/auth';

import { callStore } from '../store';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Tag } from '../definitions';

const FormSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(1, { message: "A name is required" }),
  description: z.string().trim().min(1, { message: "A description is required" }),
});
 
const CreateHolder = FormSchema.omit({ id: true });
const UpdateHolder = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    description?: string[];
    name?: string[];
  };
  message?: string | null;
  formData: {
    description: string | undefined;
    name: string | undefined;
  }
};

export async function createTag(prevState: State, formData: FormData) : Promise<any> {
 

   const session = await auth(); // Get the current session
  let userName;
  if (!session?.user) {
    throw new Error('You must be signed in to create tags.');
  } else {
    userName = session.user.email as string
  }

    const incomingFormValues = {
      description: formData.get('description'),
      name: formData.get('name')
  }

   const validatedFields = CreateHolder.safeParse(incomingFormValues);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Tag.',
      formData: incomingFormValues
    };
  }

  const { name, description } = validatedFields.data;
 
  try {
     const tag : Tag = { description, name }
     const data = {tag}
    const result = await callStore('tag', 'POST', data)
    // TODO: want to directly deal with 404's using notFound()
  } catch (error) {
    // We'll also log the error to the console for now
    console.error(error);
    return {
      message: 'Database Error: Failed to Create Holder.',
    };
  }
 
  revalidatePath('/dashboard/tags');
  redirect('/dashboard/tags');
}

export async function updateTag (
  id: string,
  prevState: State,
  formData: FormData,
) : Promise<any>  {

     const session = await auth(); // Get the current session
  let userName;
  if (!session?.user) {
    throw new Error('You must be signed in to edit tags.');
  } else {
    userName = session.user.email as string
  }
      const incomingFormValues = {
      description: formData.get('description'),
      name: formData.get('name')
  }
  const validatedFields = UpdateHolder.safeParse(incomingFormValues) ;
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Holder.',
      formData: incomingFormValues
    };
  }
 
  const { description, name } = validatedFields.data;
 
  try {
     const tag : Tag = { description, name }
     const data = {tag}
     const result = await callStore(`tag/${id}`, 'PUT', data)
  } catch (error) {
    return { message: 'Database Error: Failed to update tag.' };
  }
 
  revalidatePath('/dashboard/tag');
  redirect('/dashboard/tags');
}



