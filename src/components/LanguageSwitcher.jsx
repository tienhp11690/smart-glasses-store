import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage()

  return (
    <motion.button
      onClick={toggleLanguage}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative px-4 py-2 glass rounded-full font-semibold text-white hover:glass-strong transition-all duration-300 flex items-center gap-2"
      title={language === 'en' ? 'Switch to Vietnamese' : 'Chuyển sang tiếng Anh'}
    >
      <span className="text-lg">{language === 'en' ? '🇬🇧' : '🇻🇳'}</span>
      <span className="text-sm font-bold uppercase">{language}</span>
    </motion.button>
  )
}

export default LanguageSwitcher


