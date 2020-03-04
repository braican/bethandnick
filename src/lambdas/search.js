import axios from 'axios';
import https from 'https';

const base = 'https://bethandnick.ups.dock';
const route = '/wp-json/guestlist/v1/search';
const url = base + route;
const eventId = 142;

const API_TOKEN = process.env.BETHANDNICK_API_TOKEN;

export async function handler(event) {
  try {
    const { search } = event.queryStringParameters;

    const agent = new https.Agent({
      rejectUnauthorized: false,
    });

    const { data } = await axios.get( url, {
      httpsAgent: agent,
      params: {
        event: eventId,
        s_addr: search,
      },
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
