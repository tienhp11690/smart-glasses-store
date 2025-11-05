import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const HomeHero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-slate-900" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-gradient">See the Future</span>
              <br />
              <span className="text-white">Through Smart Glasses</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              AI-powered smart glasses with 4K recording, real-time assistant, and seamless integration into your daily life.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                to="/catalogue"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold text-white text-center hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
              >
                Explore Products
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 glass rounded-full font-semibold text-white text-center hover:bg-white/20 transition-all duration-300"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Right: Hero Image/Video Placeholder */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="glass-strong rounded-3xl p-8 glow">
              {/* Placeholder for hero image/video - replace with actual media */}
              <div className="aspect-video bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                <p className="text-gray-400 text-sm">
                  Add hero image/video/gif to: /public/assets/hero-media.jpg (or .mp4/.gif)
                </p>
              </div>
              {/* Uncomment when you add actual media:
              <img 
                src="/assets/hero-media.jpg" 
                alt="Smart Glasses Hero" 
                className="rounded-2xl w-full"
              />
              */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HomeHero

