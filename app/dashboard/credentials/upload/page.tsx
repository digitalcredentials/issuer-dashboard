import Form from '@/app/ui/credentials/upload-form';
import Breadcrumbs from '@/app/ui/credentials/breadcrumbs';
import { fetchAllTags, fetchAllTemplates, fetchAllTenants } from '@/app/lib/data';
 
export default async function Page() {

   const [templates, tenants, tags] = await Promise.all([
      fetchAllTemplates(),
      fetchAllTenants(),
      fetchAllTags()
    ])

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
           { label: 'Credentials', href: '/dashboard/credentials' },
          { label: 'Upload Credential Batch', href: '/dashboard/credentials/upload', active: true, }
        ]}
      />
      <Form templates={templates} tenants={tenants} tags={tags} />
    </main>
  );
}