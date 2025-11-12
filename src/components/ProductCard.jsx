import { motion } from 'framer-motion'
import MediaDisplay from './MediaDisplay'
import { formatPrice } from '../utils/currencyFormat'
import { useLanguage } from '../contexts/LanguageContext'

const ProductCard = ({ product }) => {
  const { language } = useLanguage()
  
  // Use thumbnail for catalogue, fallback to first image
  const displayImage = product.thumbnail || (product.images && product.images.length > 0 ? product.images[0] : null)

  const priceInfo = formatPrice(product.price, product.currency)
  
  // Get description based on language
  const description = language === 'vi'
    ? (product.shortDescription_vi || product.longDescription_vi || product.shortDescription || product.longDescription)
    : (product.shortDescription || product.longDescription)

  // Get features based on language
  const features = language === 'vi' 
    ? (product.features_vi || product.features) 
    : product.features

  return (
    <motion.div
      className="glass rounded-2xl overflow-hidden hover:glass-strong transition-all duration-300 h-full flex flex-col"
      whileHover={{ scale: 1.03, y: -5 }}
    >
      {displayImage && (
        <div className="aspect-square overflow-hidden bg-gradient-to-br from-cyan-500/10 to-purple-500/10 flex items-center justify-center p-8">
          <MediaDisplay 
            src={`${import.meta.env.BASE_URL}${displayImage}`} 
            alt={product.name}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
      )}
      
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
        <p className="text-gray-400 text-sm mb-4">
          {description}
        </p>
        
        {/* Feature Tags */}
        {features && features.length > 0 && (
          <div className="mb-4 flex-grow">
            <div className="flex flex-wrap gap-2">
              {features.map((feature, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="px-3 py-1.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 rounded-full text-xs font-semibold text-cyan-300 flex items-center gap-1.5"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </motion.span>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-auto">
          <span className="text-3xl font-bold text-gradient">
            {priceInfo.position === 'before' ? priceInfo.symbol : ''}{priceInfo.amount}{priceInfo.position === 'after' ? ` ${priceInfo.symbol}` : ''}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard

