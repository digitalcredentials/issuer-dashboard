'use client';

import Link from 'next/link';
import {
  UserCircleIcon,
  AtSymbolIcon,
  MagnifyingGlassCircleIcon,
  EyeSlashIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createTenant, State } from '@/app/lib/tenants/actions';
import { useActionState } from 'react';

export default function Form() {
  const initialState: State = { message: null, errors: {}, formData: {
    name: undefined, 
    description: undefined, 
    email: undefined,
    issuer_image_url: undefined,
    issuer_url: undefined,
    issuer_name: undefined,
    env_name: undefined,
    status: 'active' } 
  }
  const [state, formAction] = useActionState(createTenant, initialState);

  return (
     <form action={formAction}> 
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
       
 {/* Tenant Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Tenant Name (for internal use)
          </label>
          <div className="relative mt-2 rounded-md">
             <div className="relative">
              <input
                id="name"
                name="name"
                type="string"
                defaultValue={state.formData.name}
                placeholder="Enter a name for the tenant"
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

         {/* Tenant Description */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Tenant Description (Internal use)
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="description"
                name="description"
                type="string"
                defaultValue={state.formData.description}
                placeholder="Enter a description for the tenant"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="description-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
               <div id="description-error" aria-live="polite" aria-atomic="true">
                {state.errors?.description &&
                  state.errors.description.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
          </div>
        </div>

        
          {/* Tenant Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Tenant Email (Internal Contact)
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="string"
                defaultValue={state.formData.email}
                placeholder="Enter a contact email for the tenant"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="email-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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

 {/* Issuer Name */}
        <div className="mb-4">
          <label htmlFor="issuer_name" className="mb-2 block text-sm font-medium">
            Issuer Name (will appear on credential)
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="issuer_name"
                name="issuer_name"
                type="string"
                defaultValue={state.formData.issuer_name}
                placeholder="Enter a name for the issuer"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="issuer_name-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
               <div id="issuer_name-error" aria-live="polite" aria-atomic="true">
                {state.errors?.issuer_name &&
                  state.errors.issuer_name.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
          </div>
        </div>

         {/* Issuer URL */}
        <div className="mb-4">
          <label htmlFor="issuer_url" className="mb-2 block text-sm font-medium">
            Issuer URL (will appear on credential)
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="issuer_url"
                name="issuer_url"
                type="string"
                defaultValue={state.formData.issuer_url}
                placeholder="Enter a URL for the issuer"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="issuer_url-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
               <div id="issuer_url-error" aria-live="polite" aria-atomic="true">
                {state.errors?.issuer_url &&
                  state.errors.issuer_url.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
          </div>
        </div>

         {/* Issuer Image URL */}
        <div className="mb-4">
          <label htmlFor="issuer_image_url" className="mb-2 block text-sm font-medium">
            Issuer Image URL (will appear in credential)
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="issuer_image_url"
                name="issuer_image_url"
                type="string"
                defaultValue={state.formData.issuer_image_url}
                placeholder="Enter a url for the issuer's iamge"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="issuer_image_url-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
               <div id="issuer_image_url-error" aria-live="polite" aria-atomic="true">
                {state.errors?.issuer_image_url &&
                  state.errors.issuer_image_url.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
          </div>
        </div>

 {/* ENV name */}
        <div className="mb-4">
          <label htmlFor="env_name" className="mb-2 block text-sm font-medium">
            Environment Variable Name (containing signing-service token)
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="env_name"
                name="env_name"
                type="string"
                defaultValue={state.formData.env_name}
                placeholder="Enter the ENV variable name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="env_name-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
               <div id="env_name-error" aria-live="polite" aria-atomic="true">
                {state.errors?.env_name &&
                  state.errors.env_name.map((error: string) => (
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
            Status (if the tenant is available for signing)
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="active"
                  name="status"
                  type="radio"
                  value="active"
                  defaultChecked={state.formData?.status === 'active'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 peer"
                />
                <label
                  htmlFor="active"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-500 peer-checked:bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Active <CheckIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="deactivated"
                  name="status"
                  defaultChecked={state.formData?.status === 'deactivated'}
                  type="radio"
                  value="deactivated"
                  className="text-white-600 h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 focus:ring-2 peer"
                />
                <label
                  htmlFor="deactivated"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-500 peer-checked:bg-red-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Deactivated <EyeSlashIcon className="h-4 w-4" />
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
          </div>      </div>
      
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/tenants"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Tenant</Button>
      </div>
    </form>
  );
}
