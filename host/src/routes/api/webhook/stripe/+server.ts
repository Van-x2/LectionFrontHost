import { json } from '@sveltejs/kit'
import { getClient } from "$lib/mongoconnect"
import Stripe from 'stripe'
import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET} from "$env/static/private"
import { ObjectId } from 'mongodb'

// Initialize Stripe with your secret key
const stripe = new Stripe(STRIPE_SECRET_KEY)
const webhookSecret = STRIPE_WEBHOOK_SECRET

const unlimitedId = 'prod_RvmY84XivcBTOm'
const premiumId = 'prod_RvmZeSK9BSsm5m'

export async function POST({ request }) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')
  try {
    // Verify the webhook signature
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    
    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        console.log('New subscription created:', event.data.object.subscription)
        const subscriptionId = event.data.object.subscription
        const userId = event.data.object.client_reference_id
        console.log(userId)
        
        try {
          // Retrieve the subscription details
          const subscription = await stripe.subscriptions.retrieve(subscriptionId)
          
          // Variable to store membership level from metadata
          let membershipLevel = null
          
          // Get product metadata from each subscription item
          for (const item of subscription.items.data) {
            // Get the product ID from the price object
            const priceId = item.price.id
            const price = await stripe.prices.retrieve(priceId, {
              expand: ['product']
            })
            
            // Access product metadata directly from expanded product
            const productMetadata = price.product.metadata
            console.log('Product Metadata:', productMetadata)
            
            // Get the productName value to use as membershipLevel
            if (productMetadata.productName) {
              membershipLevel = productMetadata.productName
            }
          }
          
          // Connect to MongoDB and update the user document
          if (membershipLevel && userId) {
            const client = await getClient()
            const Users = client.db('Users')
            const hosts = Users.collection('hosts')
            
            // Convert the string userId to MongoDB ObjectId
            const objectId = new ObjectId(userId)
            
            // Update the user's membership level
            const updateResult = await hosts.updateOne(
              { _id: objectId },
              { 
                $set: { 
                  membershipLevel: membershipLevel,
                  stripeCustomerId: event.data.object.customer 
                } 
              }
            )
            
            console.log(`Updated user membership level to ${membershipLevel}: ${updateResult.modifiedCount} document(s) modified`)
          }
          
        } catch (error) {
          console.error('Error retrieving subscription or product metadata:', error)
        }
        break
        
        case 'customer.subscription.updated':
          console.log('Subscription updated:', event.data.object.id)
          const customerId = event.data.object.customer
          const items = event.data.object.items.data
        
          let membershipLevel = 'standard'
        
          for (const item of items) {
            const productId = item.price.product
            if (productId === unlimitedId) {
              membershipLevel = 'unlimited'
              break
            }
            if (productId === premiumId) {
              membershipLevel = 'premium'
              break
            }
          }
        
          try {
            const client = await getClient()
            const Users = client.db('Users')
            const hosts = Users.collection('hosts')
        
            const result = await hosts.updateOne(
              { stripeCustomerId: customerId },
              { $set: { membershipLevel } }
            )
        
            console.log(`Updated membershipLevel to ${membershipLevel}`, result.modifiedCount)
          } catch (err) {
            console.error('Error updating membershipLevel:', err)
          }
        
          break
        
        
      case 'customer.subscription.deleted':
          try {
            console.log('Subscription cancelled event received')
            const customerId = event.data.object.customer
            console.log('Customer ID:', customerId)
        
            const client = await getClient()
            const Users = client.db('Users')
            const hosts = Users.collection('hosts')
        
            const updateResult = await hosts.updateOne(
              { stripeCustomerId: customerId },
              { $set: { membershipLevel: 'standard' } }
            )
        
            console.log('Update result:', updateResult)
        
            if (updateResult.matchedCount === 0) {
              console.warn('No user found with that customer ID')
            }
          } catch (err) {
            console.error('Error handling subscription cancellation', err)
          }
          break
        
        // Handle subscription cancellation
        console.log('Subscription cancelled:', event.data.object)

        const client = await getClient()
        const Users = client.db('Users')
        const hosts = Users.collection('hosts')
        
        
        // Update the user's membership level
        const updateResult = await hosts.updateOne(
          { stripeCustomerId: event.data.object.customer },
          { 
            $set: { 
              membershipLevel: 'standard'
            } 
          }
        )


        
        break
        
      case 'invoice.payment_succeeded':
        // Handle successful payment
        // console.log('Payment succeeded:', event.data.object)
        break
        
      case 'invoice.payment_failed':
        // Handle failed payment
        console.log('Payment failed:', event.data.object)
        break
    }
    
    return json({ received: true })
  } catch (err) {
    console.error('Webhook error:', err.message)
    return new Response('Webhook Error: ' + err.message, { status: 400 })
  }
}