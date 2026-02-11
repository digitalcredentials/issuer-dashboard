'use server';
import Form from '@/app/ui/collect/form';
import { lusitana } from '@/app/ui/fonts';
import { fetchHolderCredsById } from "@/app/lib/data";

export default async function Page() {
  const holderId = "4";
  const credentials = await fetchHolderCredsById(holderId)

  return (
    <main className ="p-4">
      <h1 className={`${lusitana.className} text-2xl p-4`}>You have the following credentials. Select one to download.</h1>
      <Form credentials={credentials}/>
    </main>
  );
}