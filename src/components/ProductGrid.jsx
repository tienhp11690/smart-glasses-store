import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard'

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link to={`/product/${product.id}`}>
            <ProductCard product={product} />
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

export default ProductGrid

