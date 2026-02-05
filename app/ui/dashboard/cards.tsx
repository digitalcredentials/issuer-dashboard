import {
  ClockIcon,
  ArchiveBoxXMarkIcon,
  InboxIcon,
  ArchiveBoxArrowDownIcon,
} from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";

const iconMap = {
  collected: ArchiveBoxArrowDownIcon,
  notified: ArchiveBoxXMarkIcon,
  pending: ClockIcon,
  creds: InboxIcon,
};

export default async function CardWrapper({reportData}: any) {
  
  const {
    totalCredentials,
    byStatus: {pending, notified, collected}
  } = reportData;

  return (
    <>
      <Card title="Total Credentials" value={totalCredentials} type="creds" />

      <Card title="Pending" value={pending} type="pending" />

      <Card title="Notified" value={notified} type="notified" />

      <Card title="Collected" value={collected} type="collected" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "creds" | "notified" | "pending" | "collected";
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
