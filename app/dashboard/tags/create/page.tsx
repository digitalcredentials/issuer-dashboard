import Form from '@/app/ui/tags/create-form';
import Breadcrumbs from '@/app/ui/credentials/breadcrumbs';
 
export default async function Page() {
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tags', href: '/dashboard/tags' },
          {
            label: 'Add Tag',
            href: '/dashboard/tags/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}