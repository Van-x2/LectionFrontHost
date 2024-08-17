import type { LayoutServerLoad } from "./$types"
import { MongoClient } from 'mongodb'
import { MONGO_STRING } from "$env/static/private"

export const load: LayoutServerLoad = async (event) => {
    const session = await event.locals.auth()
    const client = new MongoClient(MONGO_STRING)
    //connect to MongoDB
    await client.connect()
    if (session?.user) {
        console.log(`Layout ran with [${session.user.name}]`)

        const Users = client.db('Users')
        const hosts = Users.collection('hosts')
    

    } else {
        console.log('Layout ran without user')
    }
    




    return {
        session,
    }
}