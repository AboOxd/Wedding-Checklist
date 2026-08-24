import { get } from '@netlify/blobs';

export async function handler(event) {
  const store = event.queryStringParameters.store;
  
  if (!store) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Store name required' })
    };
  }

  try {
    const blob = await get(store);
    
    if (!blob) {
      return {
        statusCode: 404,
        body: JSON.stringify(null)
      };
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify(blob),
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
