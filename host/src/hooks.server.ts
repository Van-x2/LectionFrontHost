console.log('Hooks.server Running')

import { connectToDatabase, closeDatabase } from "$lib/mongoconnect"

/** @type {import('@sveltejs/kit').HandleServerError} */
export async function handleError({ error }) {
    console.error(error)
    await closeDatabase()
}

//Connects to the database when the server starts
connectToDatabase().catch(console.error)

//Dev stuff
if (import.meta.hot) {
    import.meta.hot.on('vite:beforeFullReload', async () => {
      await closeDatabase();
    });
  }

export { handle } from "./auth"