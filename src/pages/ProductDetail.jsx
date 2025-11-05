import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { loadProducts } from '../utils/dataLoader'
import MediaDisplay from '../components/MediaDisplay'
import OrderForm from '../components/OrderForm'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await loadProducts()
        const foundProduct = data.products?.find(p => p.id === id)
        if (foundProduct) {
          setProduct(foundProduct)
          // Set default selections
          if (foundProduct.colors && foundProduct.colors.length > 0) {
            setSelectedColor(foundProduct.colors[0])
          }
          if (foundProduct.sizes && foundProduct.sizes.length > 0) {
            setSelectedSize(foundProduct.sizes[0])
          }
        }
      } catch (error) {
        console.error('Error loading product:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
        <p className="mt-4 text-gray-400">Loading product...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <button
          onClick={() => navigate('/catalogue')}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold text-white hover:shadow-lg transition-all"
        >
          Back to Catalogue
        </button>
      </div>
    )
  }

  const currentImage = product.images && product.images[selectedImageIndex]
    ? product.images[selectedImageIndex]
    : product.images?.[0]

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.button
        onClick={() => navigate('/catalogue')}
        className="mb-8 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
        whileHover={{ x: -5 }}
      >
        ← Back to Catalogue
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Media Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass rounded-2xl overflow-hidden mb-4">
            <div className="aspect-square bg-gradient-to-br from-cyan-500/10 to-purple-500/10">
              {currentImage ? (
                <MediaDisplay
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-gray-500">No image available</p>
                </div>
              )}
            </div>
          </div>

          {/* Thumbnail Gallery */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden glass transition-all ${
                    selectedImageIndex === index
                      ? 'ring-2 ring-cyan-400 glass-strong'
                      : 'hover:glass-strong'
                  }`}
                >
                  <MediaDisplay
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Right: Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              {product.name}
            </h1>
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-4xl font-bold text-white">
                ${product.price}
              </span>
              <span className="text-gray-400">
                {product.currency || 'USD'}
              </span>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              {product.longDescription || product.shortDescription}
            </p>
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <label className="block text-sm font-semibold mb-3">
                Color: <span className="text-cyan-400">{selectedColor}</span>
              </label>
              <div className="flex gap-3 flex-wrap">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-2 rounded-full glass transition-all ${
                      selectedColor === color
                        ? 'glass-strong ring-2 ring-cyan-400'
                        : 'hover:glass-strong'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <label className="block text-sm font-semibold mb-3">
                Size: <span className="text-cyan-400">{selectedSize}</span>
              </label>
              <div className="flex gap-3 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-2 rounded-full glass transition-all ${
                      selectedSize === size
                        ? 'glass-strong ring-2 ring-cyan-400'
                        : 'hover:glass-strong'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Order Form */}
          <div className="glass-strong rounded-2xl p-6">
            <OrderForm
              product={product}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProductDetail

