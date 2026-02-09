import Form from '@/app/ui/holders/create-form';
import Breadcrumbs from '@/app/ui/credentials/breadcrumbs';
 
export default async function Page() {
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Holders', href: '/dashboard/holders' },
          {
            label: 'Add Holder',
            href: '/dashboard/holders/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}