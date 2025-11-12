import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../locales/translations'
import MediaDisplay from '../components/MediaDisplay'

const UserGuide = () => {
  const { language } = useLanguage()
  const t = translations[language]

  const quickStartSteps = [
    {
      number: 1,
      title: t.setupTitle,
      description: t.setupDesc,
      image: 'assets/Glass01a.jpg',
      icon: '📦'
    },
    {
      number: 2,
      title: t.pairTitle,
      description: t.pairDesc,
      image: 'assets/Glass02a.jpg',
      icon: '📱'
    },
    {
      number: 3,
      title: t.startTitle,
      description: t.startDesc,
      image: 'assets/Glass03a.jpg',
      icon: '✨'
    }
  ]

  const features = [
    {
      title: t.aiAssistantTitle,
      description: t.aiAssistantDesc,
      image: 'assets/features/ai-chat.jpg',
      icon: '🎤'
    },
    {
      title: t.photoCaptureTitle,
      description: t.photoCaptureDesc,
      image: 'assets/features/ai-photo-transparent.jpg',
      icon: '📸'
    },
    {
      title: t.translationTitle,
      description: t.translationDesc,
      image: 'assets/features/ai-translation.jpg',
      icon: '🌐'
    },
    {
      title: t.navigationTitle,
      description: t.navigationDesc,
      image: 'assets/features/ai-features.jpg',
      icon: '🗺️'
    }
  ]

  const troubleshooting = [
    {
      issue: t.connectionIssue,
      solution: t.connectionSolution,
      icon: '🔌'
    },
    {
      issue: t.batteryIssue,
      solution: t.batterySolution,
      icon: '🔋'
    },
    {
      issue: t.audioIssue,
      solution: t.audioSolution,
      icon: '🔊'
    }
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gradient">
          {t.userGuideTitle}
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          {t.userGuideSubtitle}
        </p>
      </motion.div>

      {/* Download App Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-20"
      >
        <div className="glass-strong rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            📱 {t.downloadApp}
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            {language === 'vi' 
              ? 'Tải ứng dụng trợ lý AI để kết nối và điều khiển kính thông minh của bạn'
              : 'Download the AI Assistant app to connect and control your smart glasses'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-black text-white rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-gray-900 transition-colors"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <div className="text-left">
                <div className="text-xs">{language === 'vi' ? 'Tải trên' : 'Download on'}</div>
                <div className="text-lg font-bold">App Store</div>
              </div>
            </motion.a>

            <motion.a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-black text-white rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-gray-900 transition-colors"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              <div className="text-left">
                <div className="text-xs">{language === 'vi' ? 'Tải trên' : 'GET IT ON'}</div>
                <div className="text-lg font-bold">Google Play</div>
              </div>
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Quick Start Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            🚀 {t.quickStart}
          </h2>
          <p className="text-gray-300 text-lg">
            {t.quickStartDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {quickStartSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="glass rounded-2xl overflow-hidden hover:glass-strong transition-all"
            >
              {/* Image */}
              <div className="aspect-video bg-gradient-to-br from-cyan-500/10 to-purple-500/10 flex items-center justify-center p-4">
                <MediaDisplay
                  src={`${import.meta.env.BASE_URL}${step.image}`}
                  alt={step.title}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">{step.icon}</span>
                  <div>
                    <span className="text-cyan-400 font-semibold text-sm">
                      {t.step} {step.number}
                    </span>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                  </div>
                </div>
                <p className="text-gray-400">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Key Features Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mb-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            💡 {t.keyFeaturesGuide}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="glass rounded-2xl overflow-hidden hover:glass-strong transition-all group"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="md:w-1/3 aspect-square bg-gradient-to-br from-cyan-500/10 to-purple-500/10 flex items-center justify-center p-4">
                  <MediaDisplay
                    src={`${import.meta.env.BASE_URL}${feature.image}`}
                    alt={feature.title}
                    className="w-full h-full object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="md:w-2/3 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-3xl">{feature.icon}</span>
                    <h3 className="text-2xl font-bold">{feature.title}</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Troubleshooting */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mb-12"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            🔧 {t.troubleshooting}
          </h2>
          <p className="text-gray-300 text-lg">
            {t.troubleshootingDesc}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {troubleshooting.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="glass rounded-xl p-6 hover:glass-strong transition-all"
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-cyan-400">
                    {item.issue}
                  </h3>
                  <p className="text-gray-300">
                    ✓ {item.solution}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Contact CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="text-center glass-strong rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold mb-4">
          {language === 'vi' ? 'Cần thêm trợ giúp?' : 'Need More Help?'}
        </h3>
        <p className="text-gray-300 mb-6">
          {language === 'vi' 
            ? 'Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn'
            : 'Our support team is always ready to help you'
          }
        </p>
        <a
          href="/#/contact"
          className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
        >
          {t.contact}
        </a>
      </motion.div>
    </div>
  )
}

export default UserGuide

