'use server';
 
import { auth } from '@/auth';

import { callStore } from '../store';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Tenant } from '../definitions';

const FormSchema = z.object({
  name: z.string().trim().min(1, { message: "A name is required" }),
  description: z.string().trim().min(1, { message: "A description is required" }),
  email: z.string().trim().min(1, { message: "A contact email is required" }),
  issuer_name: z.string().trim().min(1, { message: "A name for the issuer is required" }),
  issuer_url: z.string().trim().min(1, { message: "A url for the issuer is required" }),
  issuer_image_url: z.string().trim().min(1, { message: "An image url is required" }),
  env_name: z.string().trim().min(1, { message: "The environment variable with the signing token is required." }),
  status: z.string().trim().min(1, { message: "You must specify a status." }),
});
 
export type State = {
  errors?: {
    description?: string[];
    name?: string[];
    email?: string[];
    issuer_name?: string[];
    issuer_url?: string[];
    issuer_image_url?: string[];
    env_name?: string[];
    status?: string[];
  };
  message?: string | null;
  formData: {
    description: string | undefined;
    name: string | undefined;
    email: string | undefined;
    issuer_name: string | undefined;
    issuer_url: string | undefined;
    issuer_image_url: string | undefined;
    env_name: string | undefined;
    status: string | undefined;
  }
};

export async function createTenant(prevState: State, formData: FormData) : Promise<any> {
 
  console.log("incoming form data:")
  console.log(formData)

   const session = await auth(); // Get the current session
  let userName;
  if (!session?.user) {
    throw new Error('You must be signed in to create a new issuer.');
  } else {
    userName = session.user.email as string
  }

    const incomingFormValues = {
      description: formData.get('description'),
      name: formData.get('name'),
      email: formData.get('email'),
    issuer_name: formData.get('issuer_name'),
    issuer_url: formData.get('issuer_url'),
    issuer_image_url: formData.get('issuer_image_url'),
    env_name: formData.get('env_name'),
    status: formData.get('status')
  }

   const validatedFields = FormSchema.safeParse(incomingFormValues);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Tenant.',
      formData: incomingFormValues
    };
  }

  const { name, description, email, issuer_name, issuer_url, issuer_image_url, env_name, status } = validatedFields.data;
  const is_active = status === 'active'
  try {
     const tenant : Tenant = { name, description, email, issuer_name, issuer_url, issuer_image_url, env_name, is_active }
     const data = {tenant, added_by: userName}
     const result = await callStore('tenant', 'POST', data)
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Create Tenant.',
    };
  }
 
  revalidatePath('/dashboard/tenants');
  redirect('/dashboard/tenants');
}

export async function updateTenant (
  id: string,
  prevState: State,
  formData: FormData,
) : Promise<any>  {
     const session = await auth(); // Get the current session
  let userName;
  if (!session?.user) {
    throw new Error('You must be signed in to edit tenants.');
  } else {
    userName = session.user.email as string
  }
  const incomingFormValues = {
      description: formData.get('description'),
      name: formData.get('name'),
      email: formData.get('email'),
    issuer_name: formData.get('issuer_name'),
    issuer_url: formData.get('issuer_url'),
    issuer_image_url: formData.get('issuer_image_url'),
    env_name: formData.get('env_name'),
    status: formData.get('status')
  }
  const validatedFields = FormSchema.safeParse(incomingFormValues) ;
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Tenant.',
      formData: incomingFormValues
    };
  }
 
  const { name, description, email, issuer_name, issuer_url, issuer_image_url, env_name, status } = validatedFields.data;
 const is_active = status === 'active'
  try {
     const tenant : Tenant = { name, description, email, issuer_name, issuer_url, issuer_image_url, env_name, is_active }
     const data = {tenant, updated_by:userName}
     const result = await callStore(`tenant/${id}`, 'PUT', data)
  } catch (error) {
    return { message: 'Database Error: Failed to update tenant.' };
  }
 
  revalidatePath('/dashboard/tenants');
  redirect('/dashboard/tenants');
}



