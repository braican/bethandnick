import axios from 'axios';
import https from 'https';
import SparkPost from 'sparkpost';

import { createAttendingEmail, createDeclinedEmail, createAlertEmail } from '../util';

const API_KEY = process.env.BETHANDNICK_API_KEY;
const SPARKPOST_API_KEY = process.env.SPARKPOST_API_KEY;
const base = 'https://bethandnick.ups.dock';
const route = '/wp-json/guestlist/v1/update';
const url = base + route;
const emailClient = new SparkPost(SPARKPOST_API_KEY);

async function sendEmail(data) {
  try {
    const { rsvps } = data;
    const { [data.activeGuestId]: activeGuest, ...rest } = rsvps;
    const otherRsvps = Object.values(rest);
    const email = activeGuest.attending
      ? createAttendingEmail(activeGuest, otherRsvps)
      : createDeclinedEmail(activeGuest, otherRsvps);

    const send = await emailClient.transmissions.send({
      content: {
        from: 'nick@mail.braican.com',
        reply_to: 'nick.braica@gmail.com',
        subject: 'test 7',
        html: email,
      },
      // recipients: [{ address: 'nick.braica@gmail.com' }, { address: 'nick@upstatement.com' }],
      recipients: [{ address: 'nick@upstatement.com' }],
    });

    await emailClient.transmissions.send({
      content: {
        from: 'nick@mail.braican.com',
        reply_to: 'nick.braica@gmail.com',
        subject: 'New RSVP!',
        html: createAlertEmail(rsvps),
      },
      recipients: [{ address: 'nick.braica@gmail.com' }],
    });

    return send;
  } catch (error) {
    throw new Error();
  }
}

async function submitRsvp(postData) {
  try {
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });

    const { data } = await axios.post(url, postData, {
      httpsAgent: agent,
      headers: { Authorization: API_KEY },
    });

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
    const data = JSON.parse(event.body);
    await submitRsvp(data);
    await sendEmail(data);

    return {
      statusCode: 200,
      body: 'ok',
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
