import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MediaDisplay from './MediaDisplay'

const FeaturesCarousel = ({ features, language }) => {
  const [selectedFeature, setSelectedFeature] = useState(null)

  const getTitle = (feature) => {
    return language === 'vi' ? (feature.title_vi || feature.title) : feature.title
  }

  const getDescription = (feature) => {
    return language === 'vi' ? (feature.description_vi || feature.description) : feature.description
  }

  // Only show first 6 features
  const displayFeatures = features.slice(0, 6)

  return (
    <div className="relative w-full py-8">
      {/* Grid Layout - 2 rows x 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {displayFeatures.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            onClick={() => setSelectedFeature(feature)}
            className="glass rounded-2xl overflow-hidden cursor-pointer hover:glass-strong transition-all duration-300 group"
          >
            {/* Card Container */}
            <div className="relative aspect-[3/4] bg-gradient-to-br from-slate-900/50 to-slate-800/50">
              {/* Image */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <MediaDisplay
                  src={`${import.meta.env.BASE_URL}${feature.image}`}
                  alt={getTitle(feature)}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                  autoplay={false}
                />
              </div>

              {/* Overlay with title */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 line-clamp-2">
                  {getTitle(feature)}
                </h3>
                <p className="text-sm text-gray-300 line-clamp-2">
                  {getDescription(feature)}
                </p>
                
                {/* Click hint */}
                <div className="flex items-center gap-2 mt-3 text-cyan-400 text-sm font-semibold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                  {language === 'vi' ? 'Xem chi tiết' : 'View Details'}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedFeature(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl max-h-[90vh] glass-strong rounded-3xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedFeature(null)}
                className="absolute top-4 right-4 z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors group"
                aria-label="Close"
              >
                <svg
                  className="w-6 h-6 text-white group-hover:text-cyan-400 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Content */}
              <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
                {/* Image Section */}
                <div className="w-full md:w-2/3 bg-gradient-to-br from-slate-900/50 to-slate-800/50 flex items-center justify-center p-8 md:p-12">
                  <MediaDisplay
                    src={`${import.meta.env.BASE_URL}${selectedFeature.image}`}
                    alt={getTitle(selectedFeature)}
                    className="max-w-full max-h-full object-contain"
                    autoplay={true}
                  />
                </div>

                {/* Info Section */}
                <div className="w-full md:w-1/3 p-8 md:p-10 flex flex-col justify-center overflow-y-auto">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
                    {getTitle(selectedFeature)}
                  </h2>
                  
                  <p className="text-lg text-gray-300 leading-relaxed mb-8">
                    {getDescription(selectedFeature)}
                  </p>

                  {/* Decorative gradient bar */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FeaturesCarousel
