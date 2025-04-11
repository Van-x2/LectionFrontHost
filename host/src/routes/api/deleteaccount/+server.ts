import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { MONGO_STRING, MAILGUN_SECRET, MAILGUN_DOMAIN, STRIPE_SECRET_KEY } from '$env/static/private';  // Assume you have MAILGUN_DOMAIN
import { ObjectId } from 'mongodb';
import { getClient } from '$lib/mongoconnect';
import formData from 'form-data';
import { signOut } from '@auth/sveltekit/client';
import Stripe from 'stripe';

export const POST: RequestHandler = async ({ request }) => {

  //Setups up stripe body
  const stripe = new Stripe(STRIPE_SECRET_KEY)

  // Deals with turning request body into usable data
  const body = await request.json()

  // Connects to Mongodb
  const client: any = await getClient()

  const db = client.db('Users')
  const MongoCollection = db.collection('hosts')

  //deletes customer from the stripe side of things, cancelling any subscriptions in the process
  await stripe.customers.del(body.stripeid)

  const response = await MongoCollection.deleteOne(
    { _id: new ObjectId(body.id) }
    )

  return json({success: true});
};