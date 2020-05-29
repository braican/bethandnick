import axios from 'axios';
import https from 'https';
import SparkPost from 'sparkpost';

import { createAttendingEmail } from '../util';

const API_KEY = process.env.BETHANDNICK_API_KEY;
const SPARKPOST_API_KEY = process.env.SPARKPOST_API_KEY;
const base = 'https://bethandnick.ups.dock';
// const route = '/wp-json/guestlist/v1/update';
const route = '/wp-json/guestlist/v1/sadasdsds';
const url = base + route;
const emailClient = new SparkPost(SPARKPOST_API_KEY);

async function sendEmail() {
  console.log('send the email');

  try {
    const email = createAttendingEmail();
    const send = await emailClient.transmissions.send({
      content: {
        from: 'nick@mail.braican.com',
        reply_to: 'nick.braica@gmail.com',
        subject: 'test 4',
        html: email,
      },
      // recipients: [{ address: 'nick.braica@gmail.com' }, { address: 'nick@upstatement.com' }],
      recipients: [{ address: 'nick.braica@gmail.com' }],
    });

    return send;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
}

async function submitRsvp(postData) {
  try {
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });

    // const { data } = await axios.post(url, JSON.parse(postData), {
    //   httpsAgent: agent,
    //   headers: { Authorization: API_KEY },
    // });

    const data = {};

    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function handler(event) {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const rsvpResponse = await submitRsvp(event.body);
    const emailResponse = await sendEmail();

    const data = {};

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    if (!error.response) {
      error.response = {
        status: 500,
        data: 'Error',
      };
    }

    return {
      statusCode: error.response.status,
      body: JSON.stringify({ error: error.response.data }),
    };
  }
}
