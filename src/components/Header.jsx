import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const Header = () => {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/catalogue', label: 'Catalogue' },
    { path: '/contact', label: 'Contact' },
  ]

  return (
    <motion.header 
      className="sticky top-0 z-50 glass border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gradient">
            SmartVision
          </Link>
          
          <ul className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`relative px-3 py-2 transition-colors duration-200 ${
                      isActive
                        ? 'text-cyan-400 font-semibold'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400"
                        layoutId="activeTab"
                        initial={false}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </motion.header>
  )
}

export default Header

