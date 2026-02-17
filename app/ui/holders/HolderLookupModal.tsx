import StatePagination from '@/app/ui/utils/statePagination';
import StateSearch from '@/app/ui/utils/stateSearch';
import HoldersTable from '@/app/ui/holders/modalTable';

import { lusitana } from '@/app/ui/fonts';
import { HoldersTableSkeleton } from '@/app/ui/skeletons';
import { Suspense, useState, useEffect } from 'react';
import { fetchHoldersPages, fetchFilteredHolders } from '@/app/lib/data';

export default function HolderLookupModal({onClose, selectHolder}: {onClose:Function, selectHolder:Function}) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [holders, setHolders] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const [pageResult, holderResult] = await Promise.all([
          fetchHoldersPages(query),
          fetchFilteredHolders(query, page)
        ]);
        setTotalPages(pageResult);
        setHolders(holderResult)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [query, page])

  return (

    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      
      {/* Modal content container: Centered within the backdrop */}
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full m-4">
        {/* Modal content (e.g., header, body, footer) */}
       <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Find the Holder (Recipient)</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <StateSearch 
          placeholder="Search holders..."
          setQuery={setQuery}
          query={query}
          setPage={setPage}
           />
        
      </div>
      <Suspense fallback={<HoldersTableSkeleton />}>
        <HoldersTable holders={holders} selectHolder={selectHolder}/>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
      <StatePagination totalPages={totalPages} currentPage={page} setCurrentPage={setPage}/>
      </div>
        {/* Optional close button */}
        <button onClick={()=>{onClose()}} className="mt-4 p-2 bg-blue-500 text-white rounded">
          Close
        </button>
      </div>
    </div>
  )


      

}