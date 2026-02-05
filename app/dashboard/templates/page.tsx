import { fetchFilteredTemplates } from '@/app/lib/data';
import TemplatesTable from '@/app/ui/templates/table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Templates',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  const templates = await fetchFilteredTemplates(query);

  return (
    <main>
      <TemplatesTable templates={templates} />
    </main>
  );
}