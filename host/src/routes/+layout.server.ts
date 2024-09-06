import type { LayoutServerLoad } from "./$types"
import { MongoClient } from 'mongodb'
import { MONGO_STRING } from "$env/static/private"
import { redirect } from "@sveltejs/kit"


export const load: LayoutServerLoad = async (event) => {
    //If user tries to access the root of the site, send them to the /landing page instead
    if(event.url.pathname === '/') {
    throw redirect(302, '/landing')
    }

    //define session data from the handle function used in hooks.server
    const session: any = await event.locals.auth()


    //check if the user has an Oauth session
    if (session?.user) {
        //create a MongoDB client to connect with
        const client = new MongoClient(MONGO_STRING)
        //connect to MongoDB
        await client.connect()

        console.log(`Layout ran with [${session.user.name}]`)

        //defines collection & db in Mongo
        const Users = client.db('Users')
        const hosts = Users.collection('hosts')
        const OtherData = client.db('OtherData')
        const BulletinBoardItems = OtherData.collection('BulletinBoardItems')

        //Pulls Bulletinboard content from mongo
        const BulletinBoardEntries = await BulletinBoardItems.find({})
        .sort({ _id: -1 })  // Sort by _id in descending order to get the latest entries
        .limit(10)          // Limit to the last 10 entries
        .toArray()          // Convert the cursor to an array

        //converting IDs to string
        BulletinBoardEntries.forEach((entry) => {
            entry._id = entry._id.toString()
        })


        //counts how many user documents have an email matching the Oauth session email
        // there should only be 0 or 1 matching documents because email's cant repeat
        const userMatch = await hosts.countDocuments({
            emails: { $in: [session.user.email] }
          });
          
          // If there is no matching user document, then create one using Oauth session data
          if (userMatch === 0) {
            // Define the OAuth session data to be sent to MongoDB
            const OauthUser = {
              emails: [
                session.user.email,
              ],
              name: session.user.name,
              image: session.user.image,
              lobbyMinutesUsed: 0,
              membershipLevel: 0,
              stats: {
                lectionariesStarted: 0,
                studentsTaught: 0,
                promptsSubmitted: 0,
              },
              accountCreatedOn: new Date(),
            };

            //create the user doc in Mongo
            await hosts.insertOne(OauthUser)
            .then(() => {console.log('acount created')})
        }
        //Pull data from the Mongo user doc with the matching email
        //that was either just created, or recognized to already exist
        const MongoUser = await hosts.findOne({
            emails: { $in: [session.user.email] }
          })
        console.log('Data Pulled from mongo')

        //converts the MongoDB _id to a string
        MongoUser._id = MongoUser._id.toString()
        
        //update the session data returned to contain Mongo user info instead of Oauth user info
        session.user = MongoUser
        session.BulletinBoardEntries = BulletinBoardEntries

    } else {
        //console.log('Layout ran without user')
    }
    




    return {
        session,
    }
}