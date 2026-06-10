import Form from '@/app/ui/tags/edit-form';
import Breadcrumbs from '@/app/ui/credentials/breadcrumbs';
import { fetchTagById } from '@/app/lib/data';
 import { notFound } from 'next/navigation';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const tag = await fetchTagById(id);
    if (!tag) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tags', href: '/dashboard/tags' },
          {
            label: 'Edit Tag',
            href: `/dashboard/tags/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form tag={tag} />
    </main>
  );
}