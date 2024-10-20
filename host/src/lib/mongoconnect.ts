import { MongoClient } from "mongodb"
import { MONGO_STRING } from "$env/static/private"

let client: MongoClient | null = null

export async function connectToDatabase() {
    if(client && client.topology?.isConnected()) {
        console.log('connected to MongoDB on existing connection')
        return client
    }

    console.log('starting new connection to mongo')
    client = new MongoClient(MONGO_STRING)
    await client.connect()
    return client
}

export function getClient() {
    if (!client) {
        throw new Error('Call connectToDatabasefirst')
    }
    return client
}

export async function closeDatabase() {
    if(client) {
        await client.close()
        client = null
        console.log('Disconnected from MongoDB')
    }
}