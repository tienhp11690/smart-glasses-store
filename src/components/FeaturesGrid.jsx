import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MediaDisplay from './MediaDisplay'

const FeaturesGrid = ({ features, title, layout = 'default' }) => {
  const [fullscreenIndex, setFullscreenIndex] = useState(null)
  
  if (!features || features.length === 0) return null

  const openFullscreen = (index) => {
    setFullscreenIndex(index)
  }

  const closeFullscreen = () => {
    setFullscreenIndex(null)
  }

  const navigateFullscreen = (direction) => {
    if (fullscreenIndex === null) return
    const newIndex = direction === 'next' 
      ? (fullscreenIndex + 1) % features.length
      : (fullscreenIndex - 1 + features.length) % features.length
    setFullscreenIndex(newIndex)
  }

  // Keyboard navigation
  useEffect(() => {
    if (fullscreenIndex === null) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeFullscreen()
      } else if (e.key === 'ArrowLeft') {
        navigateFullscreen('prev')
      } else if (e.key === 'ArrowRight') {
        navigateFullscreen('next')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [fullscreenIndex, features.length])

  // Layout configurations matching Rokid/DJI style
  const layoutConfigs = {
    // 6 cards: 2 large left (stacked), 4 small right (2x2 grid)
    'rokid': {
      grid: 'grid-cols-1 md:grid-cols-4 lg:grid-cols-4 auto-rows-fr',
      cards: [
        'md:col-span-1 md:row-span-2', // Card 1: Large left (tall, spans 2 rows)
        'md:col-span-2 md:row-span-1', // Card 2: Top center-right (wide)
        'md:col-span-1 md:row-span-1', // Card 3: Top right
        'md:col-span-2 md:row-span-1', // Card 4: Middle center-right (wide)
        'md:col-span-1 md:row-span-1', // Card 5: Middle right
        'md:col-span-4 md:row-span-1', // Card 6: Bottom full width
      ],
      minHeights: ['500px', '245px', '245px', '245px', '245px', '280px']
    },
    // 6 cards: alternative layout (like second image)
    'dji': {
      grid: 'grid-cols-1 md:grid-cols-6 lg:grid-cols-10',
      cards: [
        'md:col-span-3 lg:col-span-5 md:row-span-1', // Large horizontal left
        'md:col-span-3 lg:col-span-5 md:row-span-1', // Large horizontal right
        'md:col-span-2 lg:col-span-2 md:row-span-2', // Small left
        'md:col-span-2 lg:col-span-3 md:row-span-1', // Medium center
        'md:col-span-2 lg:col-span-2 md:row-span-1', // Medium right
        'md:col-span-6 lg:col-span-3 md:row-span-2', // Large vertical right
      ],
      minHeights: ['280px', '280px', '300px', '250px', '250px', '400px']
    },
    // Default: simple 3-column grid
    'default': {
      grid: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      cards: Array(12).fill('md:col-span-1'),
      minHeights: Array(12).fill('280px')
    }
  }

  const config = layoutConfigs[layout] || layoutConfigs.default
  
  const getCardClass = (index) => {
    return config.cards[index] || config.cards[0]
  }
  
  const getMinHeight = (index) => {
    return config.minHeights[index] || config.minHeights[0]
  }

  return (
    <div className="w-full">
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-8 text-center"
        >
          {title}
        </motion.h2>
      )}
      
      <div className={`grid ${config.grid} gap-4`}>
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative rounded-2xl overflow-hidden group cursor-pointer ${getCardClass(index)}`}
            style={{ minHeight: getMinHeight(index) }}
            onClick={() => openFullscreen(index)}
          >
            {/* Background Image/Media */}
            <div className="absolute inset-0 bg-black">
              {feature.image && (
                <MediaDisplay
                  src={`${import.meta.env.BASE_URL}${feature.image}`}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              )}
              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>

            {/* Content Overlay */}
            <div className="relative h-full flex flex-col justify-end p-6 text-white z-10">
              <motion.h3
                className="text-2xl md:text-3xl font-bold mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
              >
                {feature.title}
              </motion.h3>
              
              {feature.description && (
                <motion.p
                  className="text-gray-300 text-sm md:text-base"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                >
                  {feature.description}
                </motion.p>
              )}

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {fullscreenIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeFullscreen}
          >
            {/* Close Button */}
            <button
              onClick={closeFullscreen}
              className="absolute top-6 right-6 z-50 p-3 glass-strong rounded-full hover:bg-white/20 transition-colors"
              aria-label="Close fullscreen"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation Arrows */}
            {features.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); navigateFullscreen('prev'); }}
                  className="absolute left-6 z-50 p-4 glass-strong rounded-full hover:bg-white/20 transition-colors"
                  aria-label="Previous"
                >
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); navigateFullscreen('next'); }}
                  className="absolute right-6 z-50 p-4 glass-strong rounded-full hover:bg-white/20 transition-colors"
                  aria-label="Next"
                >
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Fullscreen Content */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full max-w-7xl max-h-[90vh] mx-auto p-8 flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Container */}
              <div className="relative w-full h-full flex items-center justify-center mb-6">
                <MediaDisplay
                  src={`${import.meta.env.BASE_URL}${features[fullscreenIndex].image}`}
                  alt={features[fullscreenIndex].title}
                  className="max-w-full max-h-full object-contain rounded-2xl"
                />
              </div>

              {/* Feature Info */}
              <div className="text-center max-w-3xl glass-strong rounded-2xl p-8">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {features[fullscreenIndex].title}
                </h2>
                {features[fullscreenIndex].description && (
                  <p className="text-xl text-gray-300">
                    {features[fullscreenIndex].description}
                  </p>
                )}
                {/* Counter */}
                <p className="text-sm text-gray-400 mt-4">
                  {fullscreenIndex + 1} / {features.length}
                </p>
              </div>
            </motion.div>

            {/* Keyboard hint */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm flex items-center gap-4">
              <span className="flex items-center gap-2">
                <kbd className="px-2 py-1 glass-strong rounded text-xs">←</kbd>
                <kbd className="px-2 py-1 glass-strong rounded text-xs">→</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-2">
                <kbd className="px-2 py-1 glass-strong rounded text-xs">ESC</kbd>
                Close
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FeaturesGrid

