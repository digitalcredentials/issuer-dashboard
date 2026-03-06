import { InboxIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteCredential, notifyHolder } from '@/app/lib/actions';

export function AddCredential() {
  return (
    <Link
      href="/dashboard/credentials/add"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Add Credential</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UploadCredentials() {
  return (
    <Link
      href="/dashboard/credentials/upload"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Upload Batch</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateCredential({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/credentials/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteCredential({ id }: { id: string }) {
  const deleteCredentialWithId = deleteCredential.bind(null, id);
 
  return (
    <form action={deleteCredentialWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}

export function Notify({ id }: { id: string }) {
  const notifyHolderForCredId = notifyHolder.bind(null, id);
 
  return (
    <form action={notifyHolderForCredId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Notify</span>
        <InboxIcon className="w-4" />
      </button>
    </form>
  );
}