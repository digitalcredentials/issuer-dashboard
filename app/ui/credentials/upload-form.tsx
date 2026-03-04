'use client';

import { Template, Tenant } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  UserCircleIcon,
  TagIcon,
  MagnifyingGlassCircleIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { uploadBatch, State } from '@/app/lib/uploadAction';
import { useActionState } from 'react';

export default function Form({ templates, tenants }: { templates: Template[], tenants: Tenant[] }) {
  const initialState: State = { message: null, errors: {}, formData: {batchName: undefined, tenantId: undefined, templateId: undefined, csv: undefined}   };
  const [state, formAction] = useActionState(uploadBatch, initialState);
  return (
     <form action={formAction}> 

      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Credential template */}
        <div className="mb-4">
          <label htmlFor="template-id" className="mb-2 block text-sm font-medium">
            Choose a template
          </label>
          <div className="relative">
            <select
              id="template-id"
              name="templateId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={state.formData?.templateId}
              aria-describedby="template-id-error"
            >
              <option value="" disabled>
                Select a template
              </option>
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
            <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="template-id-error" aria-live="polite" aria-atomic="true">
            {state.errors?.templateId &&
              state.errors.templateId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Tenant */}
        <div className="mb-4">
          <label htmlFor="tenant-id" className="mb-2 block text-sm font-medium">
            Choose an issuer (who signs this credential)
          </label>
          <div className="relative">
            <select
              id="tenant-id"
              name="tenantId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={state.formData?.tenantId}
              aria-describedby="tenant-id-error"
            >
              <option value="" disabled>
                Select an issuer
              </option>
              {tenants.map((tenant) => (
                <option key={tenant.id} value={tenant.id}>
                  {tenant.name}
                </option>
              ))}
            </select>
            <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="tenant-id-error" aria-live="polite" aria-atomic="true">
            {state.errors?.tenantId &&
              state.errors.tenantId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

 {/* Batch Name */}
        <div className="mb-4">
          <label htmlFor="batchName" className="mb-2 block text-sm font-medium">
            Specify a name for this batch (to later find it)
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="batchName"
                name="batchName"
                type="string"
                defaultValue={state.formData?.batchName}
                placeholder="Enter a name for the batch"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="batchName-error"
              />
              <MagnifyingGlassCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
               <div id="batchName-error" aria-live="polite" aria-atomic="true">
                {state.errors?.batchName &&
                  state.errors.batchName.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
          </div>
        </div>


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
          href="/dashboard/credentials"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Submit Batch</Button>
      </div>
    </form>
  );
}
