'use server';

type queryBody = {queryTerm:string,currentPage?:number};
type credBody = {holder_id:string,cred_name: string, added_by?: string}
type holderBody = {name:string, email:string, did: string, org_id: string}
type notificationBody = {credential_id:string, email:string}
type storeBody = queryBody | credBody | holderBody | notificationBody

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