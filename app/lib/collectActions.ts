'use server';
 
import { auth } from '@/auth';

import { callStore } from './store';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

/* INcoming data:

- holderId, credId, shouldIncludeEmail, deliveryFormat(plainVC,deepLinkLCW, ?)

so this has to work that the credId comes in, along with the JWT or some other authenticated userId 
and we then check that the user owns the Credential, then get the data from the db for it, then 
construct and populate the VC, then sign it, or exchange it
*/

const FormSchema = z.object({
  //holderId: z.string(),
  credId: z.string({
    invalid_type_error: 'Please select a credential.',
  }),
  shouldIncludeEmail: z.boolean({
    invalid_type_error: "Please indicate if you'd like your email address included.",
  }),
  deliveryFormat: z.enum(['plainVC', 'deepLink', 'chapi', 'pdf', ''], {
    invalid_type_error: 'Please select a delivery format.',
  })
});
 
//const GetSignedCredential = FormSchema.omit({ holderId: true });

export type State = {
  errors?: {
    credId?: string[];
    shouldIncludeEmail?: string[];
    deliveryFormat?: string[];
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

   const validatedFields = FormSchema.safeParse({
    credId: formData.get('credId'),
    shouldIncludeEmail: formData.get('shouldIncludeEmail'),
    deliveryFormat: formData.get('deliveryFormat')
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Credential.',
    };
  }

  const { credId, shouldIncludeEmail, deliveryFormat } = validatedFields.data;
 // TODO: want to directly deal with 404's from the signing service using notFound()
  try {
    // TODO: replace username, which for now is the email address of whoever is logged in, with organizational id.
    const result = await sign({holderId: userName, credId, shouldIncludeEmail, deliveryFormat})
    return result;
  } catch (error) {
    // We'll also log the error to the console for now
    console.error(error);
    return {
      message: 'Database Error: Failed to Create Credential.',
    };
  }
 
 // revalidatePath('/collect');
 // redirect('/collect');
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
     const result = await callStore(`credential/${id}`, 'PUT', {holder_email: email, holder_name: holder, cred_name: credName})
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

