//import Pagination from '@/app/ui/pagination';
//import Search from '@/app/ui/search';
//import Table from '@/app/ui/credentials/table';
import CredentialGrid from '@/app/ui/credentials/grid'
import { AddCredential, UploadCredentials } from '@/app/ui/credentials/buttons';
import { lusitana } from '@/app/ui/fonts';
import { CredentialsTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
//import { fetchCredentialsPages } from '@/app/lib/data';
import { fetchAllCredentials, fetchAllTags, fetchAllTemplates, fetchAllTenants } from '@/app/lib/data';
export default async function Page() {
  //const searchParams = await props.searchParams;
  //const query = searchParams?.query || '';
  //const currentPage = Number(searchParams?.page) || 1;
  //const totalPages = await fetchCredentialsPages(query);

   const allCreds = await fetchAllCredentials();
      const tenants = await fetchAllTenants()
      const templates = await fetchAllTemplates()
      const tags = await fetchAllTags()

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between mb-6">
          <h1 className={`${lusitana.className} text-2xl`}>Credentials</h1>
          <div className=" flex items-center justify-end gap-2">
            <AddCredential/><UploadCredentials/>
          </div>
      </div>
      <Suspense fallback={<CredentialsTableSkeleton />}>
        <CredentialGrid data={allCreds} tenants={tenants} templates={templates} tags={tags}/>
      </Suspense>

    </div>
  );
}