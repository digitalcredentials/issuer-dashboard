import TenantGrid from "@/app/ui/tenants/grid";
import { AddTenant } from "@/app/ui/tenants/buttons";
import { lusitana } from "@/app/ui/fonts";
import { HoldersTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchAllTenants } from "@/app/lib/data";

export default async function Page() {
  const tenants = await fetchAllTenants();
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between mb-6">
        <h1 className={`${lusitana.className} text-2xl`}>Tenants</h1>
        <div className=" flex items-center justify-end gap-2">
          <AddTenant />
        </div>
      </div>
      <Suspense fallback={<HoldersTableSkeleton />}>
        <TenantGrid data={tenants} />
      </Suspense>
    </div>
  );
}
