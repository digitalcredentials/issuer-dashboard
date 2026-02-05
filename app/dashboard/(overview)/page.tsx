import CardWrapper  from '@/app/ui/dashboard/cards';
import CredentialsChart from '@/app/ui/dashboard/credentials-chart';
import LatestUploads from '@/app/ui/dashboard/latest-uploads';
import { lusitana } from '@/app/ui/fonts';
import { fetchReportData } from '@/app/lib/data';
import { Suspense } from 'react';
import { CredentialsChartSkeleton, LatestCredentialsSkeleton, CardsSkeleton } from '@/app/ui/skeletons';

export default async function Page() {
    const reportData = await fetchReportData();
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
         <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper reportData={reportData}/>
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<CredentialsChartSkeleton />}>
          <CredentialsChart reportData={reportData}/>
        </Suspense>
        <Suspense fallback={<LatestCredentialsSkeleton />}>
          <LatestUploads />
        </Suspense>
      </div>
    </main>
  );
}