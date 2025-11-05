import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import HomeHero from '../components/HomeHero'
import Features from '../components/Features'

const Home = () => {
  return (
    <div className="min-h-screen">
      <HomeHero />
      <Features />
      
      {/* CTA Section */}
      <motion.section 
        className="container mx-auto px-4 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="glass-strong rounded-3xl p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Ready to Experience the Future?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Explore our collection of AI-powered smart glasses and discover the perfect pair for you.
          </p>
          <Link
            to="/catalogue"
            className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
      </motion.section>
    </div>
  )
}

export default Home

