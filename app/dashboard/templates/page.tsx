import TemplateGrid from "@/app/ui/templates/grid";
import { AddTag } from "@/app/ui/tags/buttons";
import { lusitana } from "@/app/ui/fonts";
import { HoldersTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchAllTemplates } from "@/app/lib/data";

export default async function Page() {
  const templates = await fetchAllTemplates();
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between mb-6">
        <h1 className={`${lusitana.className} text-2xl`}>Templates</h1>
      </div>
      <Suspense fallback={<HoldersTableSkeleton />}>
        <TemplateGrid data={templates} />
      </Suspense>
    </div>
  );
}
