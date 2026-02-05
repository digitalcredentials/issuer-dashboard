'use client';

import { TemplateField, CredentialForm } from '@/app/lib/definitions';
import {
  AtSymbolIcon,
  MagnifyingGlassCircleIcon,
  TagIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateCredential, State } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function EditCredentialForm({
  credential,
  templates,
}: {
  credential: CredentialForm;
  templates: TemplateField[];
}) {
  const initialState: State = { message: null, errors: {} };
  const updateCredentialWithId = updateCredential.bind(null, credential.id);
  const [state, formAction] = useActionState(updateCredentialWithId, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Credential Type */}
        <div className="mb-4">
          <label htmlFor="credential-type" className="mb-2 block text-sm font-medium">
            Choose a template
          </label>
          <div className="relative">
            <select
              id="credential-type"
              name="credTypeId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={credential.cred_template_id}
            >
              <option value="" disabled>
                Select a credential type
              </option>
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
            <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
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
                defaultValue={credential.cred_name}
                placeholder="Enter a name for the credential"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <MagnifyingGlassCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

{/* Holder Name */}
        <div className="mb-4">
          <label htmlFor="holder" className="mb-2 block text-sm font-medium">
            Specify a name for the credential holder
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="holder"
                name="holder"
                type="string"
                defaultValue={credential.holder_name}
                placeholder="Enter a name for the credential"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <MagnifyingGlassCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Holder Email  */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Specify an email address for the credential holder
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="string"
                defaultValue={credential.holder_email}
                placeholder="Enter an email address for the credential holder"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/credentials"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Update Credential</Button>
      </div>
    </form>
  );
}
