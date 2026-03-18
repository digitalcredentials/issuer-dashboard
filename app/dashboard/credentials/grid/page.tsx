import { fetchAllCredentials, fetchAllTags, fetchAllTemplates, fetchAllTenants } from '@/app/lib/data';
import CredentialGrid from '@/app/ui/credentials/grid'

export default async function Page() {
  
    const allCreds = await fetchAllCredentials();
    const tenants = await fetchAllTenants()
    const templates = await fetchAllTemplates()
    const tags = await fetchAllTags()

  return (
    <div className="w-full">
        <CredentialGrid data={allCreds} tenants={tenants} templates={templates} tags={tags}/>
    </div>
  );
}