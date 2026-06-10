'use client';

import { Button } from '@/app/ui/button';
import { collectCredential, State } from '@/app/lib/collection/collectActions';
import { useActionState, useState } from 'react';
import Table from '@/app/ui/collect/table';
import { Suspense} from 'react';
import { CredentialsTableSkeleton } from '@/app/ui/skeletons';
import { Credential, CredentialForm } from '@/app/lib/definitions';
import { lusitana } from '@/app/ui/fonts';

import QRCode from "react-qr-code";

export default function Form({credentials, pickupToken}:{credentials:Credential[], pickupToken: string}) {
  
  const initialState: State = { message: null, errors: {} };
  const [selectedCredential, setSelectedCredential] = useState<CredentialForm | undefined>(undefined); 
  const [state, formAction] = useActionState(collectCredential, initialState);

  return (
    <>
      {!selectedCredential &&
      <>
        <h1 className={`${lusitana.className} text-2xl p-4`}>You have the following credentials. Select one to collect.</h1>
        <Suspense fallback={<CredentialsTableSkeleton />}>
            <Table credentials={credentials} setSelectedCredential={setSelectedCredential}/>
        </Suspense>
      </>
      }
     <form action={formAction}> 
     <input type="hidden" name="credId" defaultValue={selectedCredential?.id}/>
     <input type="hidden" name="pickupToken" defaultValue={pickupToken}/>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        
        {selectedCredential && !state.deepLink &&
          <>
          <div className="w-screen flex flex-col justify-center items-center">
            <h1 className={`${lusitana.className} text-center text-2xl p-4`}>You&apos;ve selected:</h1>
           <div className="w-1/2 border rounded-lg border-black bg-white max-w-300 flex flex-col justify-center items-center">
              
              
              <h2 className="text-center text-2xl p-4"> {selectedCredential.cred_name}</h2>
              <div>issued to</div>
              <h2 className="text-center text-2xl p-4"> {selectedCredential.holder_name}</h2>
              
          </div>
          </div>
            <div className="py-8">
            <EmailSelection emailAddress={selectedCredential.holder_email}/>
            </div>
            <DeliverySelection/>

            <div id="general-error" aria-live="polite" aria-atomic="true">
              {state.errors &&
                  <p className="mt-2 text-sm text-red-500">
                    {state.message}
                  </p>
                }
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <Button type="submit">Get Credential</Button>
            </div>
          </>
        }
       </div>
    </form>
   { state.deepLink && <LCWCollection deepLink={state.deepLink} /> }
    </>
  );
}


function EmailSelection ({emailAddress}:{emailAddress:string}) {
  return (
 <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Would you like to include your email address ({emailAddress}) in the credential?
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3 pl-6">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="email"
                  name="shouldIncludeEmail"
                  type="radio"
                  value="true"
                  className="text-white-600 h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 focus:ring-2"
                />
                <label
                  htmlFor="email"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Don&apos;t include email address
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="no-email"
                  name="shouldIncludeEmail"
                  type="radio"
                  value="false"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="no-email"
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

function LCWCollection({deepLink}:any) {
  if (deepLink ) {
    return (
    <div className="m-5 flex  justify-center items-center flex-col gap-4">
       <h1 className={`${lusitana.className} text-2xl p-4`}>Your credential has been prepared and is ready to be added to your Learner Credential Wallet.</h1>
    
      <div className="max-w-[900px] text-lg md:text-base font-medium">
        If you are viewing this page on your phone then click here to add your credential to the Learner Credential Wallet:<br />
      </div>
      <div className="m-5 flex justify-center gap-4">
        <a href={`${deepLink}`} className="flex h-10 items-center rounded-lg bg-gray-200 px-4 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-800">Add to LCW</a>
      </div>
      <div className="max-w-[900px] text-left text-sm md:text-base font-medium">
      If you are viewing this page on a computer screen, scan this QR from your phone camera:
      </div>
      <div className="mt-6 mb-5 flex justify-center align-middle">
        <div style={{ height: "auto", margin: "0 auto", maxWidth: 128, width: "100%" }}>
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={deepLink}
            viewBox={`0 0 256 256`}
          />
        </div>
      </div>
      </div>)
  } 
}