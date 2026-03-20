"use server";

import { Holder } from './definitions';
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

export async function fetchAllCredentials() {
  try {
    const credentials = await callStore(`credentials`, 'GET');
    return credentials;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all templates.');
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
    const result = await callStore(`credential/${id}`, 'GET');
    return result;
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

export async function fetchTagById(id: string) {
  try {
    const tag = await callStore(`tag/${id}`, 'GET');
    return tag;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tag.');
  }
}

export async function fetchHolderCredsById(
  id: string
) {
  try {
    const response = await callStore(`holder/credentials/${id}`,'GET');
    return response;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch holder credentials.');
  }
}

export async function fetchHolderCredsByPickupToken(
  pickupToken: string
) {
  try {
    const response = await callStore(`notification/${pickupToken}`,'GET');
    return response;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch holder credentials.');
  }
}

export async function fetchHolderCredsPages(id: string, queryTerm: string) {
  try {
    const count = await callStore('holder/credentials/count/${id}', 'POST', {queryTerm});
    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of holder credentials.');
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

export async function fetchAllTenants() {
  try {
    const tenants = await callStore(`tenants`, 'GET');
    return tenants;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all tenants.');
  }
}

export async function fetchAllTags() {
  try {
    const tags = await callStore(`tags`, 'GET');
    return tags;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all tags.');
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

export async function fetchTemplateById(id: string) {
  try {
    const template = await callStore(`template/${id}`, 'GET');
    return template;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch template.');
  }
}

export async function addNotification(credential_id: string, holder:Holder) {
  try {
    const response = await callStore('notification','POST', {credential_id, email: holder.email, holder_id: holder.id});
    return response.pickup_token;  // response is: { pickup_token: '9857c3d7-0dca-11f1-be3b-6a08aca4e7b8' }
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to add the notification.');
  }
}