/**
 * Load products data from /data/products.json
 * In production, this could be replaced with an API call
 */
export const loadProducts = async () => {
  try {
    const response = await fetch('/data/products.json')
    if (!response.ok) {
      throw new Error(`Failed to load products: ${response.statusText}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error loading products:', error)
    // Return empty data structure on error
    return { products: [] }
  }
}

/**
 * Get a single product by ID
 */
export const getProductById = async (id) => {
  const data = await loadProducts()
  return data.products?.find(p => p.id === id) || null
}

