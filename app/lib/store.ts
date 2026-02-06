'use server';

type queryBody = {queryTerm:string,currentPage?:number};
type credBody = {holder_name:string,holder_email:string,cred_name: string, added_by?: string}
type holderBody = {name:string, email:string, did: string, org_id: string}
type storeBody = queryBody | credBody | holderBody

export const callStore = async (path : string, method: string, body?: storeBody) => {
    console.log("the url:")
    console.log
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
    console.log(data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error(`Error calling store: ${error}`);
  }
};