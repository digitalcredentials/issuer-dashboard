import Form from '@/app/ui/credentials/edit-form';
import Breadcrumbs from '@/app/ui/credentials/breadcrumbs';
import { fetchCredentialById, fetchAllTemplates, fetchAllTenants } from '@/app/lib/data';
 import { notFound } from 'next/navigation';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [credentialResult, templates, tenants] = await Promise.all([
    fetchCredentialById(id),
    fetchAllTemplates(),
    fetchAllTenants()
  ]);

    if (!credentialResult) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Credentials', href: '/dashboard/credentials' },
          {
            label: 'Edit Credential',
            href: `/dashboard/credentials/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form credentialResult={credentialResult} templates={templates} tenants={tenants}/>
    </main>
  );
}