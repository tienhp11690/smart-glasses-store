import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { generateOrderId } from '../utils/orderHelper'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../locales/translations'

const OrderForm = ({ product, selectedModel, selectedSize }) => {
  const { language } = useLanguage()
  const t = translations[language]
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
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
      setSubmitStatus({ type: 'error', message: t.fillAllFields })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const order = {
        orderId: generateOrderId(),
        productId: product.id,
        productName: product.name,
        price: product.price,
        currency: product.currency || 'USD',
        model: selectedModel || 'N/A',
        size: selectedSize || 'N/A',
        customerName: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address || 'N/A',
        timestamp: new Date().toISOString(),
        status: 'pending'
      }

      // Try to save to backend (Netlify Function or API)
      const API_ENDPOINT = '/.netlify/functions/saveOrder'
      
      try {
        const response = await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(order),
        })

        if (response.ok) {
          setSubmitStatus({
            type: 'success',
            message: t.orderSuccess,
          })
          // Reset form
          setFormData({ name: '', phone: '', email: '', address: '' })
        } else {
          throw new Error('Server error')
        }
      } catch (apiError) {
        // Fallback: Save to localStorage and show success message
        console.warn('API not available, saving locally:', apiError)
        
        // Save to localStorage
        const existingOrders = JSON.parse(localStorage.getItem('pendingOrders') || '[]')
        existingOrders.push(order)
        localStorage.setItem('pendingOrders', JSON.stringify(existingOrders))
        
        setSubmitStatus({
          type: 'success',
          message: t.orderReceived + order.orderId,
        })
        
        // Reset form
        setFormData({ name: '', phone: '', email: '', address: '' })
      }
    } catch (error) {
      console.error('Error processing order:', error)
      setSubmitStatus({
        type: 'error',
        message: t.orderError,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">{t.placeYourOrder}</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold mb-2">
            {t.fullName} *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
            placeholder={t.enterFullName}
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold mb-2">
            {t.phoneNumber} *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
            placeholder={t.enterPhone}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-2">
            {t.emailAddress} *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
            placeholder={t.enterEmail}
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-semibold mb-2">
            {t.shippingAddress}
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400 resize-none"
            placeholder={t.enterAddress}
          />
        </div>

        <AnimatePresence>
          {submitStatus && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`p-4 rounded-lg ${
                submitStatus.type === 'success'
                  ? 'bg-green-500/20 border border-green-500/50 text-green-300'
                  : 'bg-red-500/20 border border-red-500/50 text-red-300'
              }`}
            >
              <p className="text-sm font-semibold">{submitStatus.message}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              {t.processing}
            </span>
          ) : (
            t.submitOrder
          )}
        </motion.button>
      </form>

      <p className="mt-4 text-xs text-gray-400 text-center">
        {t.freeShipping}
      </p>
    </div>
  )
}

export default OrderForm

