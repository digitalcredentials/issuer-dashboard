'use client';

import { Tag } from '@/app/lib/definitions';
import {
  AtSymbolIcon,
  MagnifyingGlassCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateTag, State } from '@/app/lib/tags/actions';
import { useActionState } from 'react';

export default function EditTagForm({
  tag
}: {
  tag: Tag;
}) {
  const initialState: State = { message: null, errors: {}, formData: {name: tag.name, description: tag.description} };
  const upateTagWithId = updateTag.bind(null, tag.id as string);
  const [state, formAction] = useActionState(upateTagWithId, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
 {/* Tag Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Specify a name for the tag
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="string"
                defaultValue={state.formData.name}
                placeholder="Enter a name for the tag"
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

         {/* Tag Description */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Tag Description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="description"
                name="description"
                type="string"
                defaultValue={state.formData.description}
                placeholder="Enter a description for the tag"
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
          href="/dashboard/tags"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Update Tag</Button>
      </div>
    </form>
  );
}
