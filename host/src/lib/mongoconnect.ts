import { MongoClient } from "mongodb"
import { MONGO_STRING } from "$env/static/private"

let client: MongoClient | null = null

export async function connectToDatabase() {
    if(client && client.topology?.isConnected()) {
        return client
    }

    client = new MongoClient(MONGO_STRING)
    await client.connect()
    console.log('Connected to MongoDB')
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