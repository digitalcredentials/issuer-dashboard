'use server';
 
import { z } from 'zod';
//import { sign } from './sign';
import { getDeepLink } from './getDeepLink';


/* Incoming data:

- holderId, credId, shouldIncludeEmail, deliveryFormat(plainVC,deepLinkLCW, ?)

so this has to work that the credId comes in, along with the JWT or some other authenticated userId 
and we then check that the user owns the Credential, then get the data from the db for it, then 
construct and populate the VC, then sign it, or exchange it
*/

/* const FormSchema = z.object({
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
}); */

const FormSchema = z.object({
  pickupToken: z.string(),
  //holderId: z.string(),
  credId: z.string(),
  shouldIncludeEmail: z.string(),
  deliveryFormat: z.string()
});
 
export type State = {
  errors?: {
    pickupToken?: string[];
    credId?: string[];
    shouldIncludeEmail?: string[];
    deliveryFormat?: string[];
  };
  message?: string | null | undefined;
  vc?: object;
};

export async function collectCredential(prevState: State, formData: FormData) : Promise<any> {
  console.log("in the collect creential")

   const validatedFields = FormSchema.safeParse({
    pickupToken: formData.get('pickupToken'),
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

  const { credId, shouldIncludeEmail, deliveryFormat, pickupToken } = validatedFields.data;

  try {
  
   // const result = await sign({holderId: userName, credId, shouldIncludeEmail: true, deliveryFormat})
    const deepLink = await getDeepLink({pickupToken, credId, shouldIncludeEmail: shouldIncludeEmail === 'true', deliveryFormat})
    return {deepLink}
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Create Credential.',
    };
  }
 
}

