import { useState } from 'react'
import { motion } from 'framer-motion'
import { downloadOrderAsCSV, generateOrderId } from '../utils/orderHelper'

const OrderForm = ({ product, selectedColor, selectedSize }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.phone || !formData.email) {
      setSubmitStatus({ type: 'error', message: 'Please fill in all fields' })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const order = {
        orderId: generateOrderId(),
        productId: product.id,
        productName: product.name,
        color: selectedColor || 'N/A',
        size: selectedSize || 'N/A',
        customerName: formData.name,
        phone: formData.phone,
        email: formData.email,
        timestamp: new Date().toISOString(),
      }

      // Download order as CSV for admin to manually add to repo
      downloadOrderAsCSV(order)
      
      setSubmitStatus({
        type: 'success',
        message: 'Order form downloaded! Please send the CSV file to admin or add it to /data/orders.json manually.',
      })

      // Reset form
      setFormData({ name: '', phone: '', email: '' })
    } catch (error) {
      console.error('Error processing order:', error)
      setSubmitStatus({
        type: 'error',
        message: 'An error occurred. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Place Your Order</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
            placeholder="your.email@example.com"
          />
        </div>

        {submitStatus && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg ${
              submitStatus.type === 'success'
                ? 'bg-green-500/20 border border-green-500/50 text-green-300'
                : 'bg-red-500/20 border border-red-500/50 text-red-300'
            }`}
          >
            <p className="text-sm">{submitStatus.message}</p>
          </motion.div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Processing...' : 'Submit Order'}
        </button>
      </form>

      <p className="mt-4 text-xs text-gray-400 text-center">
        * Note: On GitHub Pages, orders are downloaded as CSV. For production, set up a serverless function or API endpoint.
      </p>
    </div>
  )
}

export default OrderForm

