import Form from '@/app/ui/holders/edit-form';
import Breadcrumbs from '@/app/ui/credentials/breadcrumbs';
import { fetchHolderById } from '@/app/lib/data';
 import { notFound } from 'next/navigation';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const holder = await fetchHolderById(id);
    if (!holder) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Holders', href: '/dashboard/holders' },
          {
            label: 'Edit Holder',
            href: `/dashboard/holders/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form holder={holder} />
    </main>
  );
}