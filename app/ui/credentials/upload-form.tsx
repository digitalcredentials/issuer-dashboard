'use client';

import { Tag, Template, Tenant } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  UserCircleIcon,
  TagIcon,
  MagnifyingGlassCircleIcon,
  CheckIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { uploadBatch, State } from '@/app/lib/credentials/uploadAction';
import { useActionState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Form({ templates, tenants, tags }: { templates: Template[], tenants: Tenant[], tags: Tag[] }) {
  const initialState: State = { message: null, errors: {}, formData: {
    batchName: undefined, tenantId: undefined, templateId: undefined, csv: undefined,
    validFrom: undefined,
    validUntil: undefined,
    status: undefined,
    tagId: undefined,
    description: undefined
  }   };
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
            {state.errors?.formErrors?.templateId &&
              state.errors.formErrors.templateId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Tenant */}
        <div className="mb-4">
          <label htmlFor="tenant-id" className="mb-2 block text-sm font-medium">
            Choose an issuer (who signs these credentials)
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
            {state.errors?.formErrors?.tenantId &&
              state.errors.formErrors.tenantId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

{/* tag */}
        <div className="mb-4">
          <div className="flex justify-between">
            <label htmlFor="tag-id" className="mb-2 block text-sm font-medium">
              Choose a tag (to help organize credentials) 
            </label>
          </div>
          <div className="relative">
            <select
              id="tag-id"
              name="tagId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={state.formData?.tagId}
              key={state.formData?.tagId}
              aria-describedby="tag-id-error"
            >
              <option value="select">
                Select a tag
              </option>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
            <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="tag-id-error" aria-live="polite" aria-atomic="true">
            {state.errors?.formErrors?.tagId &&
              state.errors.formErrors.tagId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>


 {/* Batch Name */}
        <div className="mb-4">
          <label htmlFor="batchName" className="mb-2 block text-sm font-medium">
            Specify a name for this batch (for posterity)
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
                {state.errors?.formErrors?.batchName &&
                  state.errors.formErrors.batchName.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
          </div>
        </div>


 {/* Batch Description */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Describe this batch (for record keeping)
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="description"
                name="description"
                type="string"
                defaultValue={state.formData?.description}
                placeholder="Enter a description for the batch"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="description-error"
              />
              <MagnifyingGlassCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
               <div id="description-error" aria-live="polite" aria-atomic="true">
                {state.errors?.formErrors?.description &&
                  state.errors.formErrors.description.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
          </div>
        </div>

 {/* Valid From */}
        <div className="mb-4">
          <label htmlFor="validFrom" className="mb-2 block text-sm font-medium">
            Valid From - the date from which point onwards the credentials are considered valid
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="validFrom"
                name="validFrom"
                type="date"
                defaultValue={state.formData?.validFrom}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="validFrom-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
               <div id="validFrom-error" aria-live="polite" aria-atomic="true">
                {state.errors?.formErrors?.validFrom &&
                  state.errors.formErrors.validFrom.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
          </div>
        </div>

          {/* Valid Until */}
        <div className="mb-4">
          <label htmlFor="validUntil" className="mb-2 block text-sm font-medium">
            Valid Until - the expiry date for the credentials
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="validUntil"
                name="validUntil"
                type="date"
                defaultValue={state.formData?.validUntil}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="validUntil-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
               <div id="validUntil-error" aria-live="polite" aria-atomic="true">
                {state.errors?.formErrors?.validUntil &&
                  state.errors.formErrors.validUntil.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
          </div>
        </div>

{/*  Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the status (whether the holders can see and collect the credentials)
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="hidden"
                  name="status"
                  type="radio"
                  value="hidden"
                  defaultChecked={state.formData?.status === 'hidden'}
                  className="text-white-600 h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 focus:ring-2 peer"
                />
                <label
                  htmlFor="hidden"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-500 peer-checked:bg-red-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Hidden <EyeSlashIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="collectable"
                  name="status"
                  type="radio"
                  value="collectable"
                  defaultChecked={state.formData?.status === 'collectable'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 peer"
                />
                <label
                  htmlFor="collectable"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-500 peer-checked:bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Collectable <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.formErrors?.status &&
              state.errors.formErrors.status.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>


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
                {state.errors?.formErrors?.csv &&
                  state.errors.formErrors.csv.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
          </div>
        </div>

          <div id="general-error" aria-live="polite" aria-atomic="true">
            {state.errors &&
            <>
                <p className="mt-2 text-sm text-red-500">
                  {state.errors.message}
                </p>
                    <Box
            sx={{
              maxHeight: '300px',
              overflowY: 'auto',
              textAlign: 'left',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              p: 1,
            }}
          >
            <Typography component="pre" variant="body2" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
              {JSON.stringify(state.errors.rowErrors, null, 2)}
            </Typography>

            {state.errors.missingEmails && JSON.stringify(state.errors.missingEmails, null, 2)}
          </Box>
              </>}
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
