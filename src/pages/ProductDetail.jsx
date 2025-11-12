import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { loadProducts } from '../utils/dataLoader'
import MediaDisplay from '../components/MediaDisplay'
import OrderForm from '../components/OrderForm'
import { formatPrice } from '../utils/currencyFormat'
import ImageLightbox from '../components/ImageLightbox'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../locales/translations'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { language } = useLanguage()
  const t = translations[language]
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedModel, setSelectedModel] = useState(null)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await loadProducts()
        const foundProduct = data.find(p => p.id === id)
        if (foundProduct) {
          setProduct(foundProduct)
          // Set default selections
          if (foundProduct.models && foundProduct.models.length > 0) {
            const firstModel = foundProduct.models[0]
            setSelectedModel(firstModel)
            // Only set imageIndex if model has one
            if (firstModel.imageIndex !== undefined) {
              setSelectedImageIndex(firstModel.imageIndex)
            }
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
  
  // Handle model selection and navigate to corresponding image
  const handleModelSelect = (model) => {
    setSelectedModel(model)
    // Only navigate to image if model has imageIndex
    if (model.imageIndex !== undefined && model.imageIndex !== null) {
      setSelectedImageIndex(model.imageIndex)
    }
  }

  // Open lightbox with specific image
  const handleImageClick = (index) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
        <p className="mt-4 text-gray-400">{t.loadingProduct}</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">{t.productNotFound}</h2>
        <button
          onClick={() => navigate('/catalogue')}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold text-white hover:shadow-lg transition-all"
        >
          {t.backToCatalogue}
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
        ← {t.backToCatalogue}
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Media Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass rounded-2xl overflow-hidden mb-4 cursor-pointer group relative">
            <div className="aspect-square bg-gradient-to-br from-cyan-500/10 to-purple-500/10 flex items-center justify-center p-4">
              {currentImage ? (
                <>
                  <MediaDisplay
                    src={`${import.meta.env.BASE_URL}${currentImage}`}
                    alt={product.name}
                    className="w-full h-full object-contain"
                    onClick={() => handleImageClick(selectedImageIndex)}
                  />
                  {/* Zoom icon overlay */}
                  <div 
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    onClick={() => handleImageClick(selectedImageIndex)}
                  >
                    <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-gray-500">{t.noImageAvailable}</p>
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
                  onDoubleClick={() => handleImageClick(index)}
                  className={`aspect-square rounded-lg overflow-hidden glass transition-all group relative flex items-center justify-center p-2 ${
                    selectedImageIndex === index
                      ? 'ring-2 ring-cyan-400 glass-strong'
                      : 'hover:glass-strong'
                  }`}
                  title={t.clickToSelect}
                >
                  <MediaDisplay
                    src={`${import.meta.env.BASE_URL}${img}`}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                  {/* Zoom hint on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
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
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">
                {(() => {
                  const priceInfo = formatPrice(product.price, product.currency)
                  return priceInfo.position === 'before' 
                    ? `${priceInfo.symbol}${priceInfo.amount}`
                    : `${priceInfo.amount} ${priceInfo.symbol}`
                })()}
              </span>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              {language === 'vi' 
                ? (product.longDescription_vi || product.shortDescription_vi || product.longDescription || product.shortDescription)
                : (product.longDescription || product.shortDescription)
              }
            </p>
          </div>

          {/* Key Features */}
          {((language === 'vi' ? product.features_vi : product.features) || product.features) && (
            <div>
              <div className="flex flex-wrap gap-2">
                {(language === 'vi' ? (product.features_vi || product.features) : product.features).map((feature, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 rounded-full text-sm font-semibold text-cyan-300 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </motion.span>
                ))}
              </div>
            </div>
          )}

          {/* Model Selection */}
          {product.models && product.models.length > 0 && (
            <div>
              <label className="block text-sm font-semibold mb-3">
                {t.model}: <span className="text-cyan-400">{selectedModel?.name}</span>
              </label>
              <div className="flex gap-3 flex-wrap">
                {product.models.map((model) => (
                  <motion.button
                    key={model.name}
                    onClick={() => handleModelSelect(model)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-2 rounded-full glass transition-all ${
                      selectedModel?.name === model.name
                        ? 'glass-strong ring-2 ring-cyan-400'
                        : 'hover:glass-strong'
                    }`}
                  >
                    {model.name}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <label className="block text-sm font-semibold mb-3">
                {t.size}: <span className="text-cyan-400">{selectedSize}</span>
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
              selectedModel={selectedModel?.name}
              selectedSize={selectedSize}
            />
          </div>
        </motion.div>
      </div>

      {/* Image Lightbox */}
      <ImageLightbox
        images={product.images || []}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        baseUrl={import.meta.env.BASE_URL}
      />
    </div>
  )
}

export default ProductDetail

