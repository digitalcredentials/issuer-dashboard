'use server';
import Form from '@/app/ui/collect/form';
import { fetchHolderCredsByPickupToken } from "@/app/lib/data";
import { notFound } from 'next/navigation';

export default async function Page(props: {
  searchParams?: Promise<{
    pickup_token?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const pickupToken = searchParams?.pickup_token || null;

  let credentials;
  if (pickupToken) {
    credentials = await fetchHolderCredsByPickupToken(pickupToken)
  } else {
    notFound()
  }
  return (
    <main className ="p-4">
      <Form credentials={credentials} pickupToken={pickupToken}/>
    </main>
  );
}