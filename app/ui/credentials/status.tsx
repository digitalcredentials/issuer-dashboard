import { ClockIcon, InboxArrowDownIcon, InboxIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function CredentialStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-blue-500 text-white': status === 'notified',
          'bg-green-500 text-white': status === 'collected',
        },
      )}
    >
      {status === 'pending' ? (
        <>
          Pending
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'notified' ? (
        <>
          Notified
          <InboxIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'collected' ? (
        <>
          Collected
          <InboxArrowDownIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
