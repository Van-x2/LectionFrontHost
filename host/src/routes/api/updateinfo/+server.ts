import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { MONGO_STRING, MAILGUN_SECRET, MAILGUN_DOMAIN } from '$env/static/private';  // Assume you have MAILGUN_DOMAIN
import { ObjectId } from 'mongodb';
import { getClient } from '$lib/mongoconnect';
import Mailgun from 'mailgun.js';
import formData from 'form-data';
import bcrypt, { hash } from 'bcrypt'

export const POST: RequestHandler = async ({ request }) => {

  // Deals with turning request body into usable data
  const body = await request.json()

  // Connects to Mongodb
  const client: any = await getClient()

  const db = client.db('Users')
  const MongoCollection = db.collection('hosts')

  if(body.prop === 'password') {

    const passwordInput = body.value
    const salt = await bcrypt.genSalt(12)
    const hashedPassword =  await bcrypt.hash(passwordInput, salt)

    if(body.migrating === true){
      await MongoCollection.updateOne(
        { _id: new ObjectId(body.id) },
        { $set: { ['accountType']: 'internal' } }
      )
    }

    await MongoCollection.updateOne(
      { _id: new ObjectId(body.id) },
      { $set: { [body.prop]: hashedPassword } }
    )

  }
  else{
    await MongoCollection.updateOne(
      { _id: new ObjectId(body.id) },
      { $set: { [body.prop]: body.value } }
    )
  }

  return json(body);
};