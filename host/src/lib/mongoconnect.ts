import { MongoClient } from "mongodb"
import { MONGO_STRING } from "$env/static/private"

let client: MongoClient | null = null

export async function connectToDatabase() {
    if (client && client.topology?.isConnected()) {
        console.log('Connected to MongoDB on existing connection')
        return client
    }

    try {
        console.log('Starting new connection to MongoDB')
        client = new MongoClient(MONGO_STRING)
        await client.connect()
        return client
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
        // If the topology is closed, attempt to reconnect
        if (error.message.includes("Topology is closed")) {
            console.log('Reconnecting to MongoDB')
            client = new MongoClient(MONGO_STRING)
            await client.connect()
            return client
        }
        throw error // Re-throw if it's a different error
    }
}

export async function getClient() {
    if (!client || !client.topology?.isConnected()) {
        console.log('Client is not connected, creating a new connection')
        return await connectToDatabase()
    }
    return client
}

export async function closeDatabase() {
    if (client) {
        await client.close()
        client = null
        console.log('Disconnected from MongoDB')
    }
}
