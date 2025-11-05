import { motion } from 'framer-motion'
import MediaDisplay from './MediaDisplay'

const ProductCard = ({ product }) => {
  const mainImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : null

  return (
    <motion.div
      className="glass rounded-2xl overflow-hidden hover:glass-strong transition-all duration-300 h-full flex flex-col"
      whileHover={{ scale: 1.03, y: -5 }}
    >
      {mainImage && (
        <div className="aspect-square overflow-hidden bg-gradient-to-br from-cyan-500/10 to-purple-500/10">
          <MediaDisplay 
            src={mainImage} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
        <p className="text-gray-400 text-sm mb-4 flex-grow">
          {product.shortDescription || product.longDescription}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-3xl font-bold text-gradient">
            ${product.price}
          </span>
          <span className="text-sm text-gray-400">
            {product.currency || 'USD'}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard

