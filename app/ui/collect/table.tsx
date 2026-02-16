'use client';

import {
  PlusIcon,
} from "@heroicons/react/24/outline";

import Image from "next/image";
import { formatDateToLocal } from "@/app/lib/utils";
export default function Table({credentials}:{credentials:any}) {
  return (
    <>
      <div className="flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {credentials?.map((credential: any) => (
                <div
                  key={credential.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <Image
                          src={"/placeholder-images/evil-rabbit.png"}
                          className="mr-2 rounded-full"
                          width={28}
                          height={28}
                          alt={`${credential.cred_name} image`}
                        />
                        <p>{credential.cred_name}</p>
                      </div>
                      <p className="text-sm text-gray-500">
                        {credential.holder_email}
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div>
                      <p className="text-xl font-medium">
                        {credential.holder_name}
                      </p>
                      <p>{formatDateToLocal(credential.date_added)}</p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <SelectCredential id={credential.id} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Credential
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Holder
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Date Added
                  </th>
                  <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {credentials?.map((credential: any) => (
                  <tr
                    key={credential.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src={"/placeholder-images/evil-rabbit.png"}
                          className="rounded-full"
                          width={28}
                          height={28}
                          alt={`${credential.cred_name}'s profile picture`}
                        />
                        <p>{credential.cred_name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {credential.holder_name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {credential.holder_email}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {formatDateToLocal(credential.date_added)}
                    </td>

                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <SelectCredential id={credential.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

function SelectCredential({ id }: { id: string }) {
  return (
    <div className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
      
      <span className="hidden md:block">Select</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </div>
  );
}
