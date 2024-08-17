import type { LayoutServerLoad } from "./$types";
import { MongoClient } from 'mongodb'
import { MONGO_STRING } from "$env/static/private"

export const load: LayoutServerLoad = async (event) => {
    const session = await event.locals.auth()
    const client = new MongoClient(MONGO_STRING)





    return {
        session,
    }
}