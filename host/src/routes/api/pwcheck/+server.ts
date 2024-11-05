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
  const client: any = getClient()

  const db = client.db('Users')
  const MongoCollection = db.collection('hosts')


// encrypts password
  const passwordInput = body.password
  const salt = await bcrypt.genSalt(12)
  const hashedPassword =  await bcrypt.hash(passwordInput, salt)

  const response = await MongoCollection.findOne(
    { _id: new ObjectId(body.id) }
  )
  //console.log(response.password)
  const pwMatch = await bcrypt.compare(passwordInput, response.password);


  return json({pwMatch: pwMatch});
};