//import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function DCCLogo() {
  return (
    <div className={`${lusitana.className} text-white`}>
      <p className="text-xl">Digital Credentials Consortium</p>
       <p className="text-l pt-2 pb-2">Credential Dashboard</p>
    </div>
  );
}

// <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />