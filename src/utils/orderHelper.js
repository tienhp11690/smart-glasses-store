/**
 * Generate a unique order ID
 */
export const generateOrderId = () => {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 1000)
  return `o${timestamp}${random}`
}

/**
 * Download order as CSV file
 * This is a client-side solution for GitHub Pages static hosting
 */
export const downloadOrderAsCSV = (order) => {
  const csvRow = [
    order.orderId,
    order.productId,
    order.productName,
    order.color,
    order.size,
    order.customerName,
    order.phone,
    order.email,
    order.timestamp,
  ].map(field => `"${String(field).replace(/"/g, '""')}"`).join(',')

  const csvHeader = 'Order ID,Product ID,Product Name,Color,Size,Customer Name,Phone,Email,Timestamp\n'
  const csvContent = csvHeader + csvRow

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', `order-${order.orderId}.csv`)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  URL.revokeObjectURL(url)
}

/**
 * Convert order to JSON string
 */
export const orderToJSON = (order) => {
  return JSON.stringify(order, null, 2)
}

/**
 * Download order as JSON file
 */
export const downloadOrderAsJSON = (order) => {
  const jsonContent = orderToJSON(order)
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', `order-${order.orderId}.json`)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  URL.revokeObjectURL(url)
}

