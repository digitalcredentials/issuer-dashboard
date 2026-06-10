import { UpdateHolder, DeleteHolder } from '@/app/ui/holders/buttons';

export default function HoldersTable({
  holders,
  selectHolder
}: {
  holders: any;
  selectHolder: Function
}) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {holders?.map((holder:any) => (
              
              <div
              onClick={()=>{selectHolder(holder)}}
                key={holder.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{holder.email}</p>
                  </div>
            
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {holder.org_id}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <div onClick={()=>{selectHolder(holder)}}/>
                  </div>
                </div>
              </div>
            ))}
          </div>


          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Org Id
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Select</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {holders?.map((holder:any) => (
                <tr onClick={()=>{selectHolder(holder)}}
                  key={holder.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{holder.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {holder.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {holder.org_id}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <div onClick={()=>{selectHolder(holder)}}/>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}
