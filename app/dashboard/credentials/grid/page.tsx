import { fetchAllCredentials } from '@/app/lib/data';
import Example from '@/app/ui/credentials/grid'

export default async function Page() {
  
    const allCreds = await fetchAllCredentials();
    console.log("ALL THE CREDENTIALS: ", JSON.stringify(allCreds,null,2))

  return (
    <div className="w-full">
        <Example data={allCreds}/>
    </div>
  );
}