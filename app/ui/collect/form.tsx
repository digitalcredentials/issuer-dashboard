'use client';

import { Button } from '@/app/ui/button';
import { collectCredential, State } from '@/app/lib/collectActions';
import { useActionState } from 'react';
import Table from '@/app/ui/collect/table';
import { Suspense} from 'react';
import { CredentialsTableSkeleton } from '@/app/ui/skeletons';
import { Credential } from '@/app/lib/definitions';

export default function Form({credentials}:{credentials:Credential[]}) {
  
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(collectCredential, initialState);

  return (
     <form action={formAction}> 
     <input type="hidden" name="credId" value='2324234'/>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <Suspense fallback={<CredentialsTableSkeleton />}>
            <Table credentials={credentials}/>
        </Suspense>
        <div className="py-8">
        <EmailSelection/>
        </div>
        <DeliverySelection/>
        
          <div id="vc" aria-live="polite" aria-atomic="true">
            {state.vc &&
                <p className="mt-2 text-sm text-red-500">
                  {JSON.stringify(state.vc,null,2)}
                </p>
              }
          </div>

          <div id="general-error" aria-live="polite" aria-atomic="true">
            {state.errors &&
                <p className="mt-2 text-sm text-red-500">
                  {state.message}
                </p>
              }
          </div>

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button type="submit">Get Credential</Button>
      </div>
    </form>
  );
}





function EmailSelection () {

  return (
 <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Would you like to include your email address in the credential?
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3 pl-6">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="shouldIncludeEmail"
                  type="radio"
                  value="pending"
                  className="text-white-600 h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 focus:ring-2"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Don&apos;t include email address
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="shouldIncludeEmail"
                  type="radio"
                  value="paid"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Include email address 
                </label>
              </div>
            </div>
          </div>
          
        </fieldset>
)}

function DeliverySelection () {
  return (
   <fieldset className="mt-2">
          <legend className="mb-2 block text-sm font-medium">
            How would you like to recieve your credential?
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3 pl-6">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="deliveryFormat"
                  type="radio"
                  value="pending"
                  className="text-white-600 h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 focus:ring-2"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Learner Credential Wallet
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="deliveryFormat"
                  type="radio"
                  value="paid"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  File download
                </label>
              </div>

               <div className="flex items-center">
                <input
                  id="paid"
                  name="deliveryFormat"
                  type="radio"
                  value="paid"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Select your web wallet
                </label>
              </div>

<div className="flex items-center">
                <input
                  id="paid"
                  name="deliveryFormat"
                  type="radio"
                  value="paid"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Deliver to your web wallet inbox
                </label>
              </div>

<div className="flex items-center">
                <input
                  id="paid"
                  name="deliveryFormat"
                  type="radio"
                  value="paid"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  PDF with QR
                </label>
              </div>

<div className="flex items-center">
                <input
                  id="paid"
                  name="deliveryFormat"
                  type="radio"
                  value="paid"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Add to your ORCID profile
                </label>
              </div>


            </div>
          </div>
          
        </fieldset>
  
)}