import Form from '@/app/ui/tenants/create-form';
import Breadcrumbs from '@/app/ui/credentials/breadcrumbs';
 
export default async function Page() {
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tenants', href: '/dashboard/tenants' },
          {
            label: 'Add Tenant',
            href: '/dashboard/tenants/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}