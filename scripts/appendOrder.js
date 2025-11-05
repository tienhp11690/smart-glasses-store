#!/usr/bin/env node

/**
 * Script to append an order to orders.json
 * 
 * Usage:
 *   node scripts/appendOrder.js <orderJSON>
 * 
 * Example:
 *   node scripts/appendOrder.js '{"orderId":"o1002","productId":"g001","productName":"Smart Glass Pro","color":"Silver","size":"L","customerName":"John Doe","phone":"+1234567890","email":"john@example.com","timestamp":"2025-01-15T10:00:00Z"}'
 * 
 * Note: This script is for local use only. GitHub Pages is static and cannot run Node.js scripts.
 * For production, use a serverless function or API endpoint.
 */

const fs = require('fs')
const path = require('path')

const orderJSON = process.argv[2]

if (!orderJSON) {
  console.error('Error: Order JSON is required')
  console.log('Usage: node scripts/appendOrder.js <orderJSON>')
  process.exit(1)
}

try {
  const order = JSON.parse(orderJSON)
  
  // Validate required fields
  const requiredFields = ['orderId', 'productId', 'productName', 'customerName', 'phone', 'email', 'timestamp']
  const missingFields = requiredFields.filter(field => !order[field])
  
  if (missingFields.length > 0) {
    console.error(`Error: Missing required fields: ${missingFields.join(', ')}`)
    process.exit(1)
  }

  // Read existing orders
  const ordersPath = path.join(__dirname, '../public/data/orders.json')
  let ordersData = { orders: [] }
  
  if (fs.existsSync(ordersPath)) {
    const fileContent = fs.readFileSync(ordersPath, 'utf8')
    ordersData = JSON.parse(fileContent)
  }

  // Append new order
  ordersData.orders.push(order)

  // Write back to file
  fs.writeFileSync(ordersPath, JSON.stringify(ordersData, null, 2), 'utf8')
  
  console.log('Order appended successfully!')
  console.log(`Order ID: ${order.orderId}`)
  console.log(`Total orders: ${ordersData.orders.length}`)
} catch (error) {
  console.error('Error processing order:', error.message)
  process.exit(1)
}

