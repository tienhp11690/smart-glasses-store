/**
 * Format currency based on currency type
 * @param {number} price - Price value
 * @param {string} currency - Currency code (USD, VND, etc.)
 * @returns {string} Formatted price string
 */
export const formatCurrency = (price, currency = 'USD') => {
  const currencyUpper = currency?.toUpperCase() || 'USD'
  
  switch (currencyUpper) {
    case 'VND':
      // Vietnamese Dong: no decimals, with thousand separators
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price)
    
    case 'USD':
    default:
      // US Dollar: with $ symbol and decimals
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(price)
  }
}

/**
 * Format price with symbol based on currency
 * @param {number} price - Price value
 * @param {string} currency - Currency code
 * @returns {object} Object with formatted price and symbol
 */
export const formatPrice = (price, currency = 'USD') => {
  const currencyUpper = currency?.toUpperCase() || 'USD'
  
  if (currencyUpper === 'VND') {
    // Vietnamese Dong format: 15.000.000 ₫
    const formatted = new Intl.NumberFormat('vi-VN').format(price)
    return {
      symbol: '₫',
      amount: formatted,
      formatted: `${formatted} ₫`,
      position: 'after' // Symbol comes after number
    }
  }
  
  // USD and other currencies: $499
  const formatted = new Intl.NumberFormat('en-US').format(price)
  return {
    symbol: '$',
    amount: formatted,
    formatted: `$${formatted}`,
    position: 'before' // Symbol comes before number
  }
}


