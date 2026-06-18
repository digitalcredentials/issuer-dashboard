'use client';

import { Holder } from '@/app/lib/definitions';
import {
  AtSymbolIcon,
  MagnifyingGlassCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateHolder, State } from '@/app/lib/holders/actions';
import { useActionState } from 'react';

export default function EditHolderForm({
  holder
}: {
  holder: Holder;
}) {
  const initialState: State = { message: null, errors: {}, formData: {name: holder.name, email: holder.email, orgId: holder.org_id, did: holder.did} };
  const updateCredentialWithId = updateHolder.bind(null, holder.id as string);
  const [state, formAction] = useActionState(updateCredentialWithId, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
 {/* Holder Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Specify a name for the holder
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="string"
                defaultValue={state.formData.name}
                placeholder="Enter a name for the holder"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-error"
              />
              <MagnifyingGlassCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
               <div id="name-error" aria-live="polite" aria-atomic="true">
                {state.errors?.name &&
                  state.errors.name.map((error: string) => (
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
            Specify the email for the holder
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={state.formData.email}
                placeholder="Enter an email address"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="email-error"
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
               <div id="email-error" aria-live="polite" aria-atomic="true">
                {state.errors?.email &&
                  state.errors.email.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
          </div>
        </div>

         {/* Holder OrgId */}
        <div className="mb-4">
          <label htmlFor="orgId" className="mb-2 block text-sm font-medium">
            Specify the organizational ID for the holder
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="orgId"
                name="orgId"
                type="string"
                defaultValue={state.formData.orgId}
                placeholder="Enter an organizational id for the credential holder"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="orgId-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
               <div id="holder-error" aria-live="polite" aria-atomic="true">
                {state.errors?.orgId &&
                  state.errors.orgId.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
          </div>
        </div>

         {/* Holder DID */}
        <div className="mb-4">
          <label htmlFor="did" className="mb-2 block text-sm font-medium">
            Holder DID
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="did"
                name="did"
                type="string"
                defaultValue={state.formData.did}
                placeholder="Enter a DID for the credential holder"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="did-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
               <div id="did-error" aria-live="polite" aria-atomic="true">
                {state.errors?.did &&
                  state.errors.did.map((error: string) => (
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
        <Button type="submit">Update Holder</Button>
      </div>
    </form>
  );
}
