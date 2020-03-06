import axios from 'axios';
import https from 'https';

const API_TOKEN = process.env.BETHANDNICK_API_TOKEN;
const base = 'https://bethandnick.ups.dock';
const route = '/wp-json/guestlist/v1/update';
const url = base + route;

export async function handler(event) {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });

    const { data } = await axios.post( url, JSON.parse(event.body), {
      httpsAgent: agent,
      headers: { 'Authorization': API_TOKEN },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };

  } catch ({ response }) {
    return {
      statusCode: response.status,
      body: JSON.stringify({ error: response.data }),
    };
  }
}
