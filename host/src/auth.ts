//Auth.ts stuff
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, AUTH_MICROSOFT_ENTRA_ID_ID, AUTH_MICROSOFT_ENTRA_ID_SECRET, AUTH_MICROSOFT_ENTRA_ID_TENANT_ID } from "$env/static/private"
import { SvelteKitAuth } from "@auth/sveltekit"
import Google from "@auth/sveltekit/providers/google"
import MicrosoftEntraID from "@auth/sveltekit/providers/microsoft-entra-id"
import Credentials from "@auth/sveltekit/providers/credentials"

//DB interaction stuff
import { getClient } from "$lib/mongoconnect"
import bcrypt, { hash } from 'bcrypt'
import { error } from "console"
import { redirect } from "@sveltejs/kit"


export const authOptions = {
  // Add trusted hosts here
  trustedHosts: ['localhost:4173']
  
};
 
export const { handle } = SvelteKitAuth({
  providers: [
    Google({ 
      clientId: GOOGLE_CLIENT_ID, 
      clientSecret: GOOGLE_CLIENT_SECRET 
      
    }),
    MicrosoftEntraID({
      clientId: AUTH_MICROSOFT_ENTRA_ID_ID,
      clientSecret: AUTH_MICROSOFT_ENTRA_ID_SECRET,
      tenantId: AUTH_MICROSOFT_ENTRA_ID_TENANT_ID,
      authorization: {
        params: {
          prompt: "select_account"
        }
      }
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
        name: {},
        type: {}, //signin or signup
      },
      authorize: async (credentials) => {
        let user: any = null

        //MongoDB stuff setup
        const client = getClient()
        const users = client.db('Users')
        const hosts = users.collection('hosts')
        
        

        //salts and hashes the password
        const preHashedPassword: any = credentials.password
        const salt = await bcrypt.genSalt(12)
        const hashedPassword =  await bcrypt.hash(preHashedPassword, salt)
        



        if(credentials.type === 'signin') {
          console.log('attempting to sign in')
          //Looks for accounts with matching emails
          const MongoUser = await hosts.findOne({ email: credentials.email })

          if(MongoUser) {
            const passwordMatchCheck = await bcrypt.compare(preHashedPassword, MongoUser.password)

            if(passwordMatchCheck) {
              user = {
                email: MongoUser.email
              }
            }
            else {
              return null
              //PW is incorrect
            }
          }
          else {
            return null
            //Email is incorrect
          }

        }

        if(credentials.type === 'signup') {
          console.log('attempting to signup')
          //Looks for accounts with matching emails
          const userCount = await hosts.countDocuments({ email: credentials.email})

          //if there are no matching accounts
          if( userCount === 0) {
            const newUser = {
              email: credentials.email,
              password: hashedPassword,
              firstname: credentials.name,
              lastname: '',
              image: 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg',
              lobbyMinutesUsed: 0,
              membershipLevel: 0,
              stats: {
                lectionariesStarted: 0,
                studentsTaught: 0,
                promptsSubmitted: 0,
              },
              accountCreatedOn: new Date(),
              accountDataComplete: false,
              emailChangable: true,
              verified: true
            }

            await hosts.insertOne(newUser)
            //adds account data to the user object to simulate a Oauth connection
            user = {
              email: credentials.email,
            }
          }
          //if there is already a matching account
          else {
            //account already exists
          }

        }


        return user
      },
      

    })

  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('callback ran')
      if (account?.provider === "credentials" && !user) {
        // Authentication failed, set custom error and code
        return `/user?error=InvalidCredentials&code=customCode`;
      }
      return true;
    },
    // ... other callbacks
  },
  pages: {
    signIn: '/user',
    error: '/user'
  },
  
  trustHost: true,
  
})