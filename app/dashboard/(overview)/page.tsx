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
    name: "Manage Credentials",
    href: "/dashboard/credentials",
    icon: DocumentDuplicateIcon,
  },
  { name: "View Reports", href: "/dashboard/reports", icon: ChartBarIcon },
  { name: "Manage Tags", href: "/dashboard/tags", icon: TagIcon },
  { name: "Manage Tenants", href: "/dashboard/tenants", icon: BuildingOfficeIcon },
  { name: "Manage Users", href: "/dashboard/users", icon: UserGroupIcon },
];

export default async function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="mt-4 flex flex-row gap-4 rounded-lg bg-gray-50">
       
          <p
            className={`${lusitana.className} text-l text-center text-gray-800 `}
          >
            <strong>Welcome to your Issuer Dashboard.</strong> 
            <div>Brought to you by
            the {" "}
            <a href="https://dcconsortium.org" className="text-blue-500">
              Digital Credentials Commons
            </a>
            </div>
          </p>
            <Image
              src="/landing-page-desktop.png"
              width={500}
              height={380}
              alt="Screenshots of the dashboard project showing desktop version"
            />
      
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
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
