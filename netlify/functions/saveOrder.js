/**
 * Netlify Serverless Function to save orders
 * 
 * This function can be used if you deploy to Netlify instead of GitHub Pages.
 * 
 * Setup:
 * 1. Deploy your site to Netlify
 * 2. This function will automatically be available at /.netlify/functions/saveOrder
 * 3. Update src/components/OrderForm.jsx to POST to this endpoint
 * 
 * For production, connect this to a database (MongoDB, Supabase, Airtable, etc.)
 */

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    }
  }

  try {
    // Parse the order data from request body
    const order = JSON.parse(event.body)

    // Validate required fields
    const requiredFields = ['orderId', 'productId', 'productName', 'customerName', 'phone', 'email']
    const missingFields = requiredFields.filter(field => !order[field])

    if (missingFields.length > 0) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          error: 'Missing required fields',
          missingFields,
        }),
      }
    }

    // TODO: Save to your database here
    // Example with MongoDB:
    // const { MongoClient } = require('mongodb')
    // const client = new MongoClient(process.env.MONGODB_URI)
    // await client.connect()
    // const db = client.db('smartglasses')
    // await db.collection('orders').insertOne(order)
    // await client.close()

    // Example with Supabase:
    // const { createClient } = require('@supabase/supabase-js')
    // const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
    // const { error } = await supabase.from('orders').insert([order])

    // For now, just log the order (in production, save to database)
    console.log('Order received:', order)

    // Return success response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'Order saved successfully',
        orderId: order.orderId,
      }),
    }
  } catch (error) {
    console.error('Error processing order:', error)
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message,
      }),
    }
  }
}

