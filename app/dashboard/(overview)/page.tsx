import { lusitana } from "@/app/ui/fonts";
import {
  DocumentDuplicateIcon,
  ChartBarIcon,
  TagIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    name: "Add and Manage Credentials",
    href: "/dashboard/credentials",
    icon: DocumentDuplicateIcon,
  },
  { name: "Add and Manage Credential Holders (Recipients)", href: "/dashboard/holders", icon: UserGroupIcon },
  { name: "Add and Manage Tags (Categories)", href: "/dashboard/tags", icon: TagIcon },
  { name: "View Reports", href: "/dashboard/reports", icon: ChartBarIcon },
  { name: "Add and Manage Tenants (Issuers)", href: "/dashboard/tenants", icon: BuildingOfficeIcon },
  { name: "Add and Manage Dashboard Users", href: "/dashboard/users", icon: UserGroupIcon },
];

export default async function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="mt-4 flex flex-row gap-4 items-center justify-center rounded-lg bg-gray-50">
       <div className="flex flex-row items-center justify-center gap-4 p-6 ">
          <p
            className={`${lusitana.className} text-2xl text-center text-gray-800 `}
          >
          Issuer Dashboard
       
          </p>
          </div>
            <Image
              src="/landing-page-desktop.png"
              width={250}
              height={190}
              alt="Screenshots of the dashboard project showing desktop version"
            />
      
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-3 ">
        {categories.map(({ name, href, icon: Icon }) => (
          <Link
            key={name}
            href={href}
            className="flex flex-col items-center justify-center gap-3 rounded-lg bg-gray-50 p-6 text-gray-700 transition-colors hover:bg-sky-100 hover:text-blue-600"
          >
            <Icon className="w-10 h-10" />
            <span className="text-sm font-medium text-center">{name}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
