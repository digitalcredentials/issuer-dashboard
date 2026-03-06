'use client';

import { Template, Tenant } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  UserCircleIcon,
  TagIcon,
  MagnifyingGlassCircleIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { uploadHolders, State } from '@/app/lib/holders/uploadAction';
import { useActionState } from 'react';

export default function Form() {
  const initialState: State = { message: null, errors: {}, formData: {csv: undefined}   };
  const [state, formAction] = useActionState(uploadHolders, initialState);
  return (
     <form action={formAction}> 

      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Upload */}
        <div className="mb-4">
          <label htmlFor="csv" className="mb-2 block text-sm font-medium">
            Upload your CSV file
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="csv"
                name="csv"
                type="file"
                defaultValue={state.formData?.csv}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="csv-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
               <div id="csv-error" aria-live="polite" aria-atomic="true">
                {state.errors?.csv &&
                  state.errors.csv.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
          </div>
        </div>

          <div id="general-error" aria-live="polite" aria-atomic="true">
            {state.errors &&
                <p className="mt-2 text-sm text-red-500">
                  {state.message}
                </p>
              }
          </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/holders"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Upload Holders</Button>
      </div>
    </form>
  );
}
