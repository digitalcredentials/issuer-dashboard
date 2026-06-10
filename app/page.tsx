import DCCLogo from '@/app/ui/dcc-logo';
import {
  ArrowRightIcon,
  DocumentDuplicateIcon,
  ChartBarIcon,
  TagIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

const categories = [
  { name: 'Credentials', href: '/dashboard/credentials', icon: DocumentDuplicateIcon },
  { name: 'Reports', href: '/dashboard/reports', icon: ChartBarIcon },
  { name: 'Tags', href: '/dashboard/tags', icon: TagIcon },
  { name: 'Tenants', href: '/dashboard/tenants', icon: BuildingOfficeIcon },
  { name: 'Users', href: '/dashboard/users', icon: UserGroupIcon },
];

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <DCCLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <div
  className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-black"
/>
           <p
      className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
    >
            <strong>Welcome to your Issuer Dashboard.</strong> Brought to you by the {' '}
            <a href="https://dcconsortium.org" className="text-blue-500">
              Digital Credentials Consortium
            </a>
        
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
        src="/landing-page-desktop.png"
        width={1000}
        height={760}
        className="hidden md:block"
        alt="Screenshots of the dashboard project showing desktop version"
      />
      <Image
        src="/hero-mobile.png"
        width={560}
        height={620}
        className="block md:hidden"
        alt="Screenshot of the dashboard project showing mobile version"
      />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map(({ name, href, icon: Icon }) => (
          <Link
            key={name}
            href={href}
            className="flex flex-col items-center justify-center gap-3 rounded-lg bg-gray-50 p-6 text-gray-700 transition-colors hover:bg-sky-100 hover:text-blue-600"
          >
            <Icon className="w-10 h-10" />
            <span className="text-sm font-medium">{name}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
