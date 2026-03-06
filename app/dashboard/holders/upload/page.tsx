import Form from '@/app/ui/holders/upload-form';
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
          { label: 'Holders', href: '/dashboard/holders' },
          { label: 'Upload Holders', href: '/dashboard/holders/upload', active: true }
        ]}
      />
      <Form templates={templates} tenants={tenants} />
    </main>
  );
}