export async function handler(event) {
  try {
    const { store, data } = JSON.parse(event.body);
    if (!store) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Store name required' }) };
    }

    await netlifyBlob.set(store, data);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
      headers: { 'Content-Type': 'application/json' }
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
}
