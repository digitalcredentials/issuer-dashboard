import Form from '@/app/ui/credentials/create-form';
import Breadcrumbs from '@/app/ui/credentials/breadcrumbs';
import { fetchAllTemplates, fetchAllTenants, fetchAllTags } from '@/app/lib/data';
 
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
          {
            label: 'Add Credential',
            href: '/dashboard/credentials/add',
            active: true,
          },
        ]}
      />
      <Form templates={templates} tenants={tenants} tags={tags} />
    </main>
  );
}