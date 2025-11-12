/**
 * Load products data from /data/products.json
 * In production, this could be replaced with an API call
 */
export async function loadProducts() {
  try {
    const base = import.meta.env.BASE_URL || '/';
    console.log("👉 Base URL:", base);

    const response = await fetch(`${base}data/products.json`);

    if (!response.ok) {
      throw new Error(`Failed to load products: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("✅ Products loaded:", data);
    return data.products || [];
  } catch (error) {
    console.error('❌ Error loading products:', error);
    return [];
  }
}
/**
 * Get a single product by ID
 */
export const getProductById = async (id) => {
  const data = await loadProducts()
  return data.products?.find(p => p.id === id) || null
}

