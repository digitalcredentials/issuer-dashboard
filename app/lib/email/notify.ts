'use server';

import { callSMTP } from './callSMTP';
import { getPopulatedEmail } from './getPopulatedEmail';
import { addNotification, fetchCredentialById } from '../data';
const appHost = process.env.APP_HOST

export async function notify(credentialId:string) { 
  try {
     // 1. get the credential details from db.
  const {credential, holder} = await fetchCredentialById(credentialId);
  // 2. call the 'NOTIFICATIONS' endpoint with credId, date email sent, and email to which sent.
  const pickupToken = await addNotification(credential.id,holder)
  // 3. send the email
    const collectionPageURL = `${appHost}/collect?pickup_token=${pickupToken}`
    const html = getPopulatedEmail(collectionPageURL, holder.name)
     await callSMTP({
      html,
      to: holder.email, 
      from: process.env.EMAIL_FROM as string, 
      subject: "You have credentials available."
    }) 
     // 4. update the status in the credential table??? 
     //   Probably better to use the notifications table for that

    return {success: true, collectionPageURL};
  } catch (error) {
    console.log(error)
    return {
      message: 'Error: Failed to issue.',
      success: false
    };
  }
  
}





