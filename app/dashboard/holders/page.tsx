
import HolderGrid from '@/app/ui/holders/grid';
import { AddHolder, UploadHolders } from '@/app/ui/holders/buttons';
import { lusitana } from '@/app/ui/fonts';
import { HoldersTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchAllHolders } from '@/app/lib/data';

export default async function Page() { 
  const holders = await fetchAllHolders();
  return (
    <div className="w-full">
        <div className="flex w-full items-center justify-between mb-6">
              <h1 className={`${lusitana.className} text-2xl`}>Holders (Recipients)</h1>
              <div className=" flex items-center justify-end gap-2">
                <AddHolder />
                <UploadHolders />
              </div>
            </div>
      <Suspense fallback={<HoldersTableSkeleton />}>
        <HolderGrid data={holders} />
      </Suspense>
    </div>
  );
}