import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProductGrid from '../components/ProductGrid'
import { loadProducts } from '../utils/dataLoader'

const Catalogue = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await loadProducts()
        setProducts(data.products || [])
      } catch (error) {
        console.error('Error loading products:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
        <p className="mt-4 text-gray-400">Loading products...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gradient">
          Our Products
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Discover our collection of AI-powered smart glasses
        </p>
      </motion.div>
      
      <ProductGrid products={products} />
      
      {products.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg mb-4">No products found.</p>
          <p className="text-gray-500 text-sm">
            Add products to /public/data/products.json
          </p>
        </div>
      )}
    </div>
  )
}

export default Catalogue

