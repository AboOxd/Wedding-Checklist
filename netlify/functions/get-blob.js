export async function handler(event) {
  const storeName = event.queryStringParameters.store;
  if (!storeName) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Store name required' }) };
  }

  try {
    // Netlify Blob is built into the functions environment
    const blob = await netlifyBlob.get(storeName);
    if (!blob) {
      return { statusCode: 404, body: JSON.stringify(null) };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(blob),
      headers: { 'Content-Type': 'application/json' }
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
}
