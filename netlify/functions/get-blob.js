import { getStore } from '@netlify/blobs';

export async function handler(event) {
  const storeName = event.queryStringParameters.store;
  
  if (!storeName) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Store name required' })
    };
  }

  try {
    const store = getStore(storeName);
    const blob = await store.get(storeName);
    
    return {
      statusCode: 200,
      body: JSON.stringify(blob || null),
      headers: { 'Content-Type': 'application/json' }
    };
  } catch (error) {
    console.error('Error reading blob:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
