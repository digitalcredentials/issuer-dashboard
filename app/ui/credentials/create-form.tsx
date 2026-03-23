'use client';

import { Template, Tenant, Tag } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  UserCircleIcon,
  AtSymbolIcon,
  TagIcon,
  MagnifyingGlassCircleIcon,
  CheckIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createCredential, State } from '@/app/lib/credentials/actions';
import { useActionState, useState } from 'react';
import ClientPortal from '../utils/clientPortal';
import HolderLookupModal from '../holders/HolderLookupModal';

export default function Form({ templates, tenants, tags }: { templates: Template[], tenants: Tenant[], tags: Tag[] }) {
  const initialState: State = { message: null, errors: {}, formData: {credName: undefined, tenantId: 'select', holderId: undefined, status: undefined, templateId: 'select', tagId: 'select'}   };
  const [state, formAction] = useActionState(createCredential, initialState);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [holder, setHolder] = useState({name:'', did: '', org_id: '', email: '', id: undefined})
  
  const findHolder = () => {
    setIsModalOpen(true);
  }
  const selectHolder = (holder:any) => {
    setHolder(holder);
    setIsModalOpen(false);
  }
  return (
     <form action={formAction}> 
      {isModalOpen && (
        <ClientPortal>
          <div className="modal-overlay">
            <div className="modal-content">
              <HolderLookupModal selectHolder={selectHolder} onClose={()=>{setIsModalOpen(false)}} />
              <button onClick={() => setIsModalOpen(false)}>Close Modal</button>
            </div>
          </div>
        </ClientPortal>
      )}

      {/*The holderId which we don't show, but do want to submit*/}
      <input
        id="holderId"
        name="holderId"
        type="hidden"
        defaultValue={holder.id}
      />

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
              key={state.formData?.templateId}
              aria-describedby="template-id-error"
            >
              <option value="select" >
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
              key={state.formData?.tenantId}
              aria-describedby="tenant-id-error"
            >
              <option value="select">
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

 {/* tag */}
        <div className="mb-4">
          <div className="flex justify-between">
            <label htmlFor="tag-id" className="mb-2 block text-sm font-medium">
              Choose a tag (to group with other credentials) 
            </label>
            <div >Create New Tag</div>
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
            {state.errors?.tagId &&
              state.errors.tagId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>



 {/* Credential Name */}
        <div className="mb-4">
          <label htmlFor="credName" className="mb-2 block text-sm font-medium">
            Provide a short description (to later find this credential)
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="credName"
                name="credName"
                type="string"
                defaultValue={state.formData?.credName}
                placeholder="Enter a short description for the credential"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="credName-error"
              />
              <MagnifyingGlassCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
               <div id="credName-error" aria-live="polite" aria-atomic="true">
                {state.errors?.credName &&
                  state.errors.credName.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
          </div>
        </div>


        {/* Holder Name */}
        <div className="mb-4">
          <label htmlFor="holder" className="mb-2 block text-sm font-medium">
            Choose a holder (click the field to search)
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                readOnly
                id="holder"
                name="holder"
                type="string"
                placeholder="Click to find a holder"
                defaultValue={holder.name}
                onClick={findHolder}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="holder-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
               <div id="holder-error" aria-live="polite" aria-atomic="true">
                {state.errors?.holderId &&
                  state.errors.holderId.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
          </div>
        </div>

        {/* Holder email address */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Holder&apos;s email address
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                readOnly
                id="email"
                name="email"
                type="email"
                defaultValue={holder.email}
                placeholder="Automatically set from holder search"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="email-error"
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        

                {/* Holder org id */}
        <div className="mb-4">
          <label htmlFor="org_id" className="mb-2 block text-sm font-medium">
            Holder&apos;s internal organizational id
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                readOnly
                id="org_id"
                name="org_id"
                type="org_id"
                defaultValue={holder.org_id}
                placeholder="Automatically set from holder search"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="email-error"
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>


{/*  Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the status (whether the holder can see and collect the credential)
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
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>


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
        <Button type="submit">Create Credential</Button>
      </div>
    </form>
  );
}
