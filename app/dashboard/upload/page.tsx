import Form from '@/app/ui/credentials/upload-form';
import Breadcrumbs from '@/app/ui/credentials/breadcrumbs';
import { fetchAllTemplates, fetchAllTenants } from '@/app/lib/data';
 
export default async function Page() {
  const [templates, tenants] = await Promise.all([
    fetchAllTemplates(),
    fetchAllTenants()
  ])

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Upload Credentials', href: '/dashboard/upload', active: true, }
        ]}
      />
      <Form templates={templates} tenants={tenants} />
    </main>
  );
}