import Form from '@/app/ui/holders/upload-form';
import Breadcrumbs from '@/app/ui/credentials/breadcrumbs';
 
export default async function Page() {

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Holders', href: '/dashboard/holders' },
          { label: 'Upload Holders', href: '/dashboard/holders/upload', active: true }
        ]}
      />
      <Form/>
    </main>
  );
}