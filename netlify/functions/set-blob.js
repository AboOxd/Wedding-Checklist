import { getStore } from '@netlify/blobs';

export async function handler(event) {
  try {
    const { store: storeName, data } = JSON.parse(event.body);
    
    if (!storeName) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Store name required' })
      };
    }

    if (!data) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Data required' })
      };
    }

    const store = getStore(storeName);
    await store.setJson(storeName, data);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
      headers: { 'Content-Type': 'application/json' }
    };
  } catch (error) {
    console.error('Error writing blob:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
