'use server';
import Form from '@/app/ui/collect/form';
import { lusitana } from '@/app/ui/fonts';
import { fetchHolderCredsByPickupToken, fetchHolderCredsById } from "@/app/lib/data";

export default async function Page(props: {
  searchParams?: Promise<{
    pickup_token?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const pickupToken = searchParams?.pickup_token || null;
  const holderId = "4";
  let credentials;
  if (pickupToken) {
    credentials = await fetchHolderCredsByPickupToken(pickupToken)
    console.log("the test result", credentials)
  } 
   // const credentials = await fetchHolderCredsById(holderId)
  

  return (
    <main className ="p-4">
      <h1 className={`${lusitana.className} text-2xl p-4`}>You have the following credentials. Select one to download.</h1>
      <Form credentials={credentials}/>
    </main>
  );
}