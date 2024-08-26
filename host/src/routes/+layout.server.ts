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
    //create a MongoDB client to connect with
    const client = new MongoClient(MONGO_STRING)
    //connect to MongoDB
    await client.connect()

    //check if the user has an Oauth session
    if (session?.user) {
        console.log(`Layout ran with [${session.user.name}]`)

        //defines collection & db in Mongo
        const Users = client.db('Users')
        const hosts = Users.collection('hosts')

        //counts how many user documents have an email matching the Oauth session email
        // there should only be 0 or 1 matching documents because email's cant repeat
        const userMatch = await hosts.countDocuments({ email: session.user.email })

        //If there is no matching user document, then create one using Oauth session data
        if( userMatch == 0) {
            //define the Oauth session data to be sent to Mongo
            const OauthUser = {
                email: session.user.email,
                name: session.user.name,
                image: session.user.image,
                lobbyMinutesUsed: 0,
                membershipLevel: 0,
                acountCreatedOn: new Date(),
            }

            //create the user doc in Mongo
            await hosts.insertOne(OauthUser)
            .then(() => {console.log('acount created')})
        }
        //Pull data from the Mongo user doc with the matching email
        //that was either just created, or recognized to already exist
        const MongoUser = await hosts.findOne({email: session.user.email})
        console.log('Data Pulled from mongo')

        //converts the MongoDB _id to a string
        MongoUser._id = MongoUser._id.toString()
        
        //update the session data returned to contain Mongo user info instead of Oauth user info
        session.user = MongoUser

    } else {
        //console.log('Layout ran without user')
    }
    




    return {
        session,
    }
}