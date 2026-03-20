'use server';
import { Holder, Tag } from "./definitions";
type queryBody = {queryTerm:string,currentPage?:number};
type credBody = {holder_id:string,cred_template_id:string,cred_name: string, tenant_id: string, tag_id: string,added_by?: string}
type bulkCredUpdateBody = {cred_ids:string,cred_template_id:string,status: string, tenant_id: string, tag_id: string,updated_by?: string}

type tagBody = {tag: Tag}
type holderBody = {added_by:string, holder: Holder} //{name:string, email:string, did: string, org_id: string}
type holdersBody = {added_by:string, holders: Holder[]}
type notificationBody = {credential_id:string, email:string}
type emailBody = string[]
type storeBody = queryBody | credBody | holderBody | notificationBody | emailBody | holdersBody | bulkCredUpdateBody | tagBody

export const callStore = async (path : string, method: string, body?: storeBody) => {
  try {
    const response = (method === 'GET') ?
        await fetch(`http://localhost:3000/${path}`)
        :
       await fetch(`http://localhost:3000/${path}`,
        {
          method, 
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(body)
        }
       ) 
       
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json(); 
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error(`Error calling store: ${error}`);
  }
};