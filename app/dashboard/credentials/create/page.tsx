import Form from '@/app/ui/credentials/create-form';
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
          { label: 'Credentials', href: '/dashboard/credentials' },
          {
            label: 'Issue Credential',
            href: '/dashboard/credentials/create',
            active: true,
          },
        ]}
      />
      <Form templates={templates} tenants={tenants} />
    </main>
  );
}