// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}

        interface Session {
            user?: MongoUser;
            BulletinBoardEntries?: BulletinBoardEntries;
        }
		interface MongoUser {
            _id: ObjectId | string;
            email: string;
            name: string;
            image: string;
            lobbyMinutesUsed: number;
            membershipLevel: number;
            accountCreatedOn: Date;
        }
        interface BulletinBoardEntries {
        
        }
	}
}

export {};
