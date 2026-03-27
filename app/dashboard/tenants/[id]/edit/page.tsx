import Form from '@/app/ui/tenants/edit-form';
import Breadcrumbs from '@/app/ui/credentials/breadcrumbs';
import { fetchTenantById } from '@/app/lib/data';
 import { notFound } from 'next/navigation';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const tenant = await fetchTenantById(id);
    if (!tenant) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tenants', href: '/dashboard/tenants' },
          {
            label: 'Edit Tenant',
            href: `/dashboard/tenants/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form tenant={tenant} />
    </main>
  );
}