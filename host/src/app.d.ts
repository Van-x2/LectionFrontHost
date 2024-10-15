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
            firstname: string;
            lastname: string;
            password: string;
            image: string;
            lobbyMinutesUsed: number;
            membershipLevel: number;
            stats: {
                lectionariesStarted: number;
                studentsTaught: number;
                promptsSubmitted: number;
            };
            accountCreatedOn: Date;
            accountDataComplete: boolean;
            emailChangable: boolean;
            verified: boolean;
        }
        interface BulletinBoardEntries {
        
        }
	}
}

export {};
