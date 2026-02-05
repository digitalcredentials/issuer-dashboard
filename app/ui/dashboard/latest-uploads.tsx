import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestBatches } from '@/app/lib/data';

export default async function LatestUploads() {
  const latestBatches = await fetchLatestBatches();
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Uploads
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: Uncommented this code in Chapter 7 */}

         <div className="bg-white px-6">
          {latestBatches.map((batch:any, i:number) => {
            return (
              <div
                key={batch.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <Image
                    src={'/placeholder-images/evil-rabbit.png'}
                    alt={`image for ${batch.name}`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {batch.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {batch.description}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  {(new Date(batch.date_added)).toDateString()}
                </p>
              </div>
            );
          })}
        </div> 
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
