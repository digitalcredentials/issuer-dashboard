import Form from '@/app/ui/credentials/edit-form';
import Breadcrumbs from '@/app/ui/credentials/breadcrumbs';
import { fetchCredentialById, fetchAllTemplates } from '@/app/lib/data';
 import { notFound } from 'next/navigation';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [credential, templates] = await Promise.all([
    fetchCredentialById(id),
    fetchAllTemplates(),
  ]);

    if (!credential) {
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
      <Form credential={credential} templates={templates} />
    </main>
  );
}