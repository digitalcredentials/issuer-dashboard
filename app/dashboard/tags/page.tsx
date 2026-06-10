import TagGrid from "@/app/ui/tags/grid";
import { AddTag } from "@/app/ui/tags/buttons";
import { lusitana } from "@/app/ui/fonts";
import { HoldersTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchAllTags } from "@/app/lib/data";

export default async function Page() {
  const tags = await fetchAllTags();
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between mb-6">
        <h1 className={`${lusitana.className} text-2xl`}>Tags</h1>
        <div className=" flex items-center justify-end gap-2">
          <AddTag />
        </div>
      </div>
      <Suspense fallback={<HoldersTableSkeleton />}>
        <TagGrid data={tags} />
      </Suspense>
    </div>
  );
}
