/**
 * Netlify Serverless Function to save orders to GitHub
 * 
 * This function saves orders to orders.json in your GitHub repository
 * 
 * Setup:
 * 1. Create a GitHub Personal Access Token with 'repo' scope
 * 2. Add it to Netlify Environment Variables as GITHUB_TOKEN
 * 3. Set GITHUB_OWNER and GITHUB_REPO in environment variables
 * 
 * For production, you can also use database (MongoDB, Supabase, etc.)
 */

const fetch = require('node-fetch')

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

    // GitHub configuration from environment variables
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN
    const GITHUB_OWNER = process.env.GITHUB_OWNER || 'tienhp11690'
    const GITHUB_REPO = process.env.GITHUB_REPO || 'smart-glasses-store'
    const FILE_PATH = 'public/data/orders.json'

    if (!GITHUB_TOKEN) {
      console.warn('GITHUB_TOKEN not set, order saved locally only')
      // Still return success to user
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          message: 'Order received successfully',
          orderId: order.orderId,
          note: 'Saved locally, GitHub integration pending'
        }),
      }
    }

    // Get current orders.json file from GitHub
    const getFileUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`
    
    const getResponse = await fetch(getFileUrl, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    })

    let orders = { orders: [] }
    let sha = null

    if (getResponse.ok) {
      const fileData = await getResponse.json()
      sha = fileData.sha
      const content = Buffer.from(fileData.content, 'base64').toString('utf8')
      orders = JSON.parse(content)
    }

    // Add new order
    orders.orders.push(order)

    // Update file on GitHub
    const updateFileUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`
    
    const updateResponse = await fetch(updateFileUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Add order ${order.orderId}`,
        content: Buffer.from(JSON.stringify(orders, null, 2)).toString('base64'),
        sha: sha,
      }),
    })

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json()
      console.error('GitHub API error:', errorData)
      throw new Error('Failed to update GitHub file')
    }

    console.log('Order saved to GitHub:', order.orderId)

    // Return success response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'Order saved successfully to GitHub',
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

