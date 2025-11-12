import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../locales/translations'
import { loadProducts } from '../utils/dataLoader'
import MediaDisplay from '../components/MediaDisplay'
import FeaturesCarousel from '../components/FeaturesCarousel'
import { formatPrice } from '../utils/currencyFormat'

const Home = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const [products, setProducts] = useState([])
  const { scrollYProgress } = useScroll()
  const videoRef = useRef(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await loadProducts()
        setProducts(data.slice(0, 3)) // Get first 3 products
      } catch (error) {
        console.error('Error loading products:', error)
      }
    }
    fetchProducts()
  }, [])

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section with Video/Media Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Media */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40"
            src={`${import.meta.env.BASE_URL}assets/hero-media.mp4`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900" />
        </div>

        {/* Hero Content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 container mx-auto px-4 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="text-gradient block mb-4">{t.heroTitle1}</span>
              <span className="text-white">{t.heroTitle2}</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            {t.heroDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/catalogue"
              className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-bold text-lg text-white hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
            >
              {t.exploreProducts}
            </Link>
            <Link
              to="/contact"
              className="px-10 py-5 glass-strong rounded-full font-bold text-lg text-white hover:bg-white/30 transition-all duration-300"
            >
              {t.learnMore}
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Products Showcase */}
      <ProductsShowcase products={products} t={t} language={language} />

      {/* Technology Section */}
      <TechnologySection t={t} />

      {/* CTA Section */}
      <CTASection t={t} />
    </div>
  )
}

// Features Section Component
const FeaturesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { language } = useLanguage()

  // Visual features with background images
  const features = [
    {
      title: "800W AI Photo Glasses",
      title_vi: "Kính AI 800W Pixels",
      description: "HD Photo & Video with 1080P 30fps recording",
      description_vi: "Quay video HD 1080P 30fps",
      image: "assets/features/ai-photo-transparent.jpg"
    },
    {
      title: "Multiple Lens Options",
      title_vi: "Đa Dạng Tùy Chọn Tròng",
      description: "Sunglasses, blue-blocking, photochromic lenses",
      description_vi: "Tròng râm, chống ánh sáng xanh, đổi màu",
      image: "assets/features/lens-options.jpg"
    },
    {
      title: "Health Monitoring",
      title_vi: "Theo Dõi Sức Khỏe",
      description: "Temperature, HR & SpO₂ tracking in real-time",
      description_vi: "Theo dõi nhiệt độ, nhịp tim & SpO₂ thời gian thực",
      image: "assets/features/temperature.jpg"
    },
    {
      title: "AI Chat & Translation",
      title_vi: "Trò Chuyện & Dịch AI",
      description: "Multi-role AI conversation & 100+ languages",
      description_vi: "Đối thoại AI đa vai trò & hơn 100 ngôn ngữ",
      image: "assets/features/ai-chat.jpg"
    },
    {
      title: "Smart Features",
      title_vi: "Tính Năng Thông Minh",
      description: "AI Role-play, Scene Record, Voice Control",
      description_vi: "Nhập vai AI, Ghi cảnh, Điều khiển giọng nói",
      image: "assets/features/ai-features.jpg"
    },
    {
      title: "Complete Ecosystem",
      title_vi: "Hệ Sinh Thái Hoàn Chỉnh",
      description: "UV Detection, Waterproof, Music Control & More",
      description_vi: "Phát hiện UV, Chống nước, Điều khiển nhạc & Nhiều hơn",
      image: "assets/features/health-management.jpg"
    }
  ]

  return (
    <section ref={ref} className="py-32 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            {language === 'vi' ? 'TÍNH NĂNG NỔI BẬT' : 'KEY FEATURES'}
          </h2>
          <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
            {language === 'vi' 
              ? 'Khám phá các tính năng công nghệ tiên tiến của kính thông minh'
              : 'Discover the advanced technology features of smart glasses'
            }
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <FeaturesCarousel 
            features={features}
            language={language}
          />
        </motion.div>
      </div>
    </section>
  )
}

// Products Showcase Component
const ProductsShowcase = ({ products, t, language }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-32 relative bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
            {language === 'vi' ? 'Bộ Sưu Tập' : 'Our Collection'}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {language === 'vi' 
              ? 'Khám phá dòng sản phẩm kính thông minh'
              : 'Discover our smart glasses lineup'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => {
            const priceInfo = formatPrice(product.price, product.currency)
            const description = language === 'vi'
              ? (product.shortDescription_vi || product.shortDescription)
              : product.shortDescription

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -15 }}
                className="glass rounded-3xl overflow-hidden group"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-square overflow-hidden bg-gradient-to-br from-cyan-500/10 to-purple-500/10 relative flex items-center justify-center p-8">
                    <MediaDisplay
                      src={`${import.meta.env.BASE_URL}${product.thumbnail || product.images?.[0]}`}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-gradient">
                        {priceInfo.formatted}
                      </span>
                      <span className="text-cyan-400 group-hover:translate-x-2 transition-transform">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Link
            to="/catalogue"
            className="inline-block px-10 py-5 glass-strong rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300"
          >
            {language === 'vi' ? 'Xem tất cả sản phẩm' : 'View All Products'} →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// Technology Section Component
const TechnologySection = ({ t }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { language } = useLanguage()

  return (
    <section ref={ref} className="py-32 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
              {language === 'vi' ? 'Công Nghệ Tiên Tiến' : 'Advanced Technology'}
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {language === 'vi'
                ? 'Kính thông minh của chúng tôi tích hợp công nghệ AI và AR tiên tiến, mang đến trải nghiệm tương lai cho cuộc sống hàng ngày của bạn.'
                : 'Our smart glasses integrate advanced AI and AR technology, bringing future experiences to your daily life.'
              }
            </p>
            <ul className="space-y-4">
              {[
                { en: 'Real-time AI Translation', vi: 'Dịch AI thời gian thực' },
                { en: 'HD Video Recording', vi: 'Quay video HD' },
                { en: 'Voice Command Control', vi: 'Điều khiển giọng nói' },
                { en: 'All-Day Comfort Design', vi: 'Thiết kế thoải mái cả ngày' }
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3 text-lg"
                >
                  <span className="text-cyan-400 text-2xl">✓</span>
                  <span>{language === 'vi' ? item.vi : item.en}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="glass-strong rounded-3xl overflow-hidden aspect-square">
              <MediaDisplay
                src={`${import.meta.env.BASE_URL}assets/hero-media.mp4`}
                alt="Technology showcase"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-8 -right-8 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-8 -left-8 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// CTA Section Component
const CTASection = ({ t }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const { language } = useLanguage()

  return (
    <section ref={ref} className="py-32 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="glass-strong rounded-[3rem] p-16 text-center relative overflow-hidden"
        >
          {/* Background Animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10" />
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, -180, -360] }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          />

          <div className="relative z-10">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
              {language === 'vi' ? 'Sẵn sàng trải nghiệm?' : 'Ready to Experience?'}
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              {language === 'vi'
                ? 'Khám phá tương lai của công nghệ đeo với kính thông minh của chúng tôi'
                : 'Discover the future of wearable technology with our smart glasses'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/catalogue"
                className="px-12 py-5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-bold text-xl text-white hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
              >
                {language === 'vi' ? 'Mua ngay' : 'Shop Now'}
              </Link>
              <Link
                to="/contact"
                className="px-12 py-5 glass rounded-full font-bold text-xl text-white hover:bg-white/20 transition-all duration-300"
              >
                {language === 'vi' ? 'Liên hệ' : 'Contact Us'}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Home
