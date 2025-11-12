import { motion } from 'framer-motion'
import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../locales/translations'

const Contact = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would send to a backend
    // For GitHub Pages, you could integrate with a form service or show instructions
    setSubmitStatus({
      type: 'success',
      message: language === 'vi' 
        ? 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.'
        : 'Thank you for your message! We\'ll get back to you soon.',
    })
    setFormData({ name: '', email: '', message: '' })
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
          {t.getInTouch}
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          {t.contactDescription}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="glass-strong rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">
              {language === 'vi' ? 'Thông Tin Cửa Hàng' : 'Store Information'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-cyan-400 mb-2">
                  {language === 'vi' ? 'Địa chỉ' : 'Address'}
                </h3>
                <p className="text-gray-300">
                  {language === 'vi' ? (
                    <>
                      123 Đường Công Nghệ<br />
                      Quận 1, Hồ Chí Minh<br />
                      Việt Nam
                    </>
                  ) : (
                    <>
                      123 Tech Street<br />
                      San Francisco, CA 94105<br />
                      United States
                    </>
                  )}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-cyan-400 mb-2">
                  {language === 'vi' ? 'Điện thoại' : 'Phone'}
                </h3>
                <p className="text-gray-300">
                  {language === 'vi' ? '+84 912 345 678' : '+1 (555) 123-4567'}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-cyan-400 mb-2">Email</h3>
                <p className="text-gray-300">info@smartvision.com</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-cyan-400 mb-2">
                  {language === 'vi' ? 'Giờ làm việc' : 'Business Hours'}
                </h3>
                <p className="text-gray-300">
                  {language === 'vi' ? (
                    <>
                      Thứ 2 - Thứ 6: 9:00 - 18:00<br />
                      Thứ 7: 10:00 - 16:00<br />
                      Chủ nhật: Nghỉ
                    </>
                  ) : (
                    <>
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="glass rounded-2xl p-8 aspect-video flex items-center justify-center">
            <p className="text-gray-400 text-sm text-center">
              {language === 'vi' ? (
                <>
                  Vị trí bản đồ<br />
                  (Tích hợp Google Maps)
                </>
              ) : (
                <>
                  Map integration placeholder<br />
                  (Add Google Maps embed or similar service)
                </>
              )}
            </p>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass-strong rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">
              {language === 'vi' ? 'Gửi Tin Nhắn' : 'Send us a Message'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-semibold mb-2">
                  {language === 'vi' ? 'Tên' : 'Name'}
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
                  placeholder={language === 'vi' ? 'Tên của bạn' : 'Your name'}
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm font-semibold mb-2">
                  {language === 'vi' ? 'Tin nhắn' : 'Message'}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400 resize-none"
                  placeholder={language === 'vi' ? 'Nội dung tin nhắn...' : 'Your message...'}
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
                className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
              >
                {language === 'vi' ? 'Gửi tin nhắn' : 'Send Message'}
              </button>
            </form>

            <p className="mt-4 text-xs text-gray-400 text-center">
              {language === 'vi' 
                ? '* Để triển khai thực tế, tích hợp với dịch vụ form hoặc backend API.'
                : '* For production, integrate with a form service (e.g., Formspree, Netlify Forms) or backend API.'
              }
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact

