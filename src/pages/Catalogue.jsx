import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProductGrid from '../components/ProductGrid'
import { loadProducts } from '../utils/dataLoader'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../locales/translations'

const Catalogue = () => {
  const { language } = useLanguage()
  const t = translations[language]
  
  const categories = [
    { id: 'all', name: t.allProducts, icon: '🔍' },
    { id: 'camera', name: t.glassWithCamera, icon: '📷' },
    { id: 'fashion', name: t.fashionedGlass, icon: '👓' }
  ]
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await loadProducts()
        setProducts(data || [])
      } catch (error) {
        console.error('Error loading products:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProducts()
  }, [])

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  const categoryStats = {
    all: products.length,
    camera: products.filter(p => p.category === 'camera').length,
    fashion: products.filter(p => p.category === 'fashion').length
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
        <p className="mt-4 text-gray-400">{t.loadingProducts}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gradient">
          {t.ourProducts}
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          {t.catalogueDescription}
        </p>
      </motion.div>

      {/* Category Tabs */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="glass rounded-2xl p-2 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                    : 'glass-strong text-gray-300 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div className="text-left">
                    <div className="text-sm md:text-base">{category.name}</div>
                    <div className="text-xs opacity-75">
                      {categoryStats[category.id]} {categoryStats[category.id] === 1 ? t.product : t.products}
                    </div>
                  </div>
                </div>
                {selectedCategory === category.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl"
                    style={{ zIndex: -1 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Products Grid */}
      <motion.div
        key={selectedCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <ProductGrid products={filteredProducts} />
      </motion.div>
      
      {/* Empty State */}
      {filteredProducts.length === 0 && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="glass-strong rounded-3xl p-12 max-w-md mx-auto">
            <span className="text-6xl mb-4 block">📭</span>
            <p className="text-gray-400 text-lg mb-2">{t.noProductsInCategory}</p>
            <p className="text-gray-500 text-sm">
              {t.checkBackSoon}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Catalogue

