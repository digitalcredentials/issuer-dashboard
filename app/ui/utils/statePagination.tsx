'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { generatePagination } from '@/app/lib/utils';

export default function StatePagination({ totalPages, currentPage = 1, setCurrentPage }: { totalPages: number, currentPage: number, setCurrentPage: Function }) {

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <>
       <div className="inline-flex">
        <PaginationArrow
          direction="left"
          setNewPage={()=>setCurrentPage(currentPage-1)}
          isDisabled={currentPage <= 1}
        />

        <div className="flex -space-x-px">
          {allPages.map((page, index) => {
            let position: 'first' | 'last' | 'single' | 'middle' | undefined;

            if (index === 0) position = 'first';
            if (index === allPages.length - 1) position = 'last';
            if (allPages.length === 1) position = 'single';
            if (page === '...') position = 'middle';

            return (
              <PaginationNumber
                key={`${page}-${index}`}
                setNewPage={()=>setCurrentPage(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          isDisabled={currentPage >= totalPages}
          setNewPage={()=>setCurrentPage(currentPage+1)}
        />
      </div>
    </>
  );
}

function PaginationNumber({
  page,
  isActive,
  position,
  setNewPage
}: {
  page: number | string;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
  setNewPage: Function
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center text-sm border',
    {
      'rounded-l-md': position === 'first' || position === 'single',
      'rounded-r-md': position === 'last' || position === 'single',
      'z-10 bg-blue-600 border-blue-600 text-white': isActive,
      'hover:bg-gray-100': !isActive && position !== 'middle',
      'text-gray-300': position === 'middle',
    },
  );

  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    <div className={className} onClick={setNewPage}>
      {page}
    </div>
  );
}

function PaginationArrow({
  direction,
  isDisabled,
  setNewPage
}: {
  direction: 'left' | 'right';
  isDisabled?: boolean;
  setNewPage: Function;
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center rounded-md border',
    {
      'pointer-events-none text-gray-300': isDisabled,
      'hover:bg-gray-100': !isDisabled,
      'mr-2 md:mr-4': direction === 'left',
      'ml-2 md:ml-4': direction === 'right',
    },
  );

  const icon =
    direction === 'left' ? (
      <ArrowLeftIcon className="w-4" />
    ) : (
      <ArrowRightIcon className="w-4" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <div className={className} onClick={setNewPage}>
      {icon}
    </div>
  );
}
