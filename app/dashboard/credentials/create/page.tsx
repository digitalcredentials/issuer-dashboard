import Form from '@/app/ui/credentials/create-form';
import Breadcrumbs from '@/app/ui/credentials/breadcrumbs';
import { fetchAllTemplates } from '@/app/lib/data';
 
export default async function Page() {
  const templates = await fetchAllTemplates();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Credentials', href: '/dashboard/credentials' },
          {
            label: 'Create Credential',
            href: '/dashboard/credentials/create',
            active: true,
          },
        ]}
      />
      <Form templates={templates} />
    </main>
  );
}