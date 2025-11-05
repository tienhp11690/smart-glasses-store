#!/usr/bin/env node

/**
 * Script to append an order to orders.csv
 * 
 * Usage:
 *   node scripts/appendOrderCSV.js <orderJSON>
 * 
 * Example:
 *   node scripts/appendOrderCSV.js '{"orderId":"o1002","productId":"g001","productName":"Smart Glass Pro","color":"Silver","size":"L","customerName":"John Doe","phone":"+1234567890","email":"john@example.com","timestamp":"2025-01-15T10:00:00Z"}'
 * 
 * Note: This script is for local use only. GitHub Pages is static and cannot run Node.js scripts.
 */

const fs = require('fs')
const path = require('path')

const orderJSON = process.argv[2]

if (!orderJSON) {
  console.error('Error: Order JSON is required')
  console.log('Usage: node scripts/appendOrderCSV.js <orderJSON>')
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

  const csvPath = path.join(__dirname, '../public/data/orders.csv')
  
  // CSV header
  const header = 'Order ID,Product ID,Product Name,Color,Size,Customer Name,Phone,Email,Timestamp\n'
  
  // CSV row
  const escapeCSV = (field) => {
    const str = String(field || '')
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`
    }
    return str
  }
  
  const row = [
    escapeCSV(order.orderId),
    escapeCSV(order.productId),
    escapeCSV(order.productName),
    escapeCSV(order.color || 'N/A'),
    escapeCSV(order.size || 'N/A'),
    escapeCSV(order.customerName),
    escapeCSV(order.phone),
    escapeCSV(order.email),
    escapeCSV(order.timestamp),
  ].join(',') + '\n'

  // Append to CSV file (create if doesn't exist)
  if (!fs.existsSync(csvPath)) {
    fs.writeFileSync(csvPath, header, 'utf8')
  }
  
  fs.appendFileSync(csvPath, row, 'utf8')
  
  console.log('Order appended to CSV successfully!')
  console.log(`Order ID: ${order.orderId}`)
} catch (error) {
  console.error('Error processing order:', error.message)
  process.exit(1)
}

