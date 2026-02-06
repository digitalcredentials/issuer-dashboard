import { callStore } from './store';

export async function fetchReportData() {
  try {
    const data = await callStore('report','GET');
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch report data.');
  }
}

export async function fetchLatestBatches() {
   
  try {
    const data = await callStore('batches','GET');
    return data
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest batches.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredCredentials(
  queryTerm: string,
  currentPage: number,
) {
  try {
    const response = await callStore('credentials/query','POST', {queryTerm, currentPage});
    return response.credentials;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch credentials.');
  }
}

export async function fetchFilteredHolders(
  queryTerm: string,
  currentPage: number,
) {
  try {
    const response = await callStore('holders/query','POST', {queryTerm, currentPage});
    return response.holders;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch holders.');
  }
}

export async function fetchCredentialsPages(queryTerm: string) {
  try {
    const count = await callStore('credentials/count', 'POST', {queryTerm});
    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of credentials.');
  }
}

export async function fetchHoldersPages(queryTerm: string) {
  try {
    const count = await callStore('holders/count', 'POST', {queryTerm});
    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of holders.');
  }
}

export async function fetchCredentialById(id: string) {
  try {
    const credential = await callStore(`credential/${id}`, 'GET');
    return credential;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch credential.');
  }
}

export async function fetchHolderById(id: string) {
  try {
    const holder = await callStore(`holder/${id}`, 'GET');
    return holder;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch holder.');
  }
}

export async function fetchAllTemplates() {
  try {
    const templates = await callStore(`templates`, 'GET');
    return templates;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all templates.');
  }
}

export async function fetchFilteredTemplates(queryTerm: string) {
  try {
    const response = await callStore('templates/query','POST', {queryTerm});
    return response.templates;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch templates.');
  }
}


