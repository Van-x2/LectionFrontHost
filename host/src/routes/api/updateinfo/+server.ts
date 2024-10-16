import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { MONGO_STRING, MAILGUN_SECRET, MAILGUN_DOMAIN } from '$env/static/private';  // Assume you have MAILGUN_DOMAIN
import { ObjectId } from 'mongodb';
import { getClient } from '$lib/mongoconnect';
import Mailgun from 'mailgun.js';
import formData from 'form-data';

export const POST: RequestHandler = async ({ request }) => {

  // Deals with turning request body into usable data
  const body = await request.json()

  // Connects to Mongodb
  const client = getClient()

  const db = client.db('Users')
  const MongoCollection = db.collection('hosts')

  await MongoCollection.updateOne(
    { _id: new ObjectId(body.id) },
    { $set: { [body.prop]: body.value } }
  );

  return json(body);
};