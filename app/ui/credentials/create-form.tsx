'use client';

import { TemplateField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  UserCircleIcon,
  AtSymbolIcon,
  TagIcon,
  MagnifyingGlassCircleIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createCredential, State } from '@/app/lib/actions';
import { useActionState, useState } from 'react';
import ClientPortal from '../utils/clientPortal';
import HolderLookupModal from '../holders/HolderLookupModal';

export default function Form({ templates }: { templates: TemplateField[] }) {
  const initialState: State = { message: null, errors: {} };
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
              defaultValue=""
              aria-describedby="credential-id-error"
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
          <div id="credential-id-error" aria-live="polite" aria-atomic="true">
            {state.errors?.templateId &&
              state.errors.templateId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

 {/* Credential Name */}
        <div className="mb-4">
          <label htmlFor="credName" className="mb-2 block text-sm font-medium">
            Specify a name for this credential
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="credName"
                name="credName"
                type="string"
                placeholder="Enter a name for the credential"
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
            Choose a holder (click to search)
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
