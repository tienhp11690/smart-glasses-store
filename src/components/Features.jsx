import { motion } from 'framer-motion'

const Features = () => {
  const features = [
    {
      icon: '📷',
      title: '4K Camera Recording',
      description: 'Crystal-clear video and photo capture with advanced image stabilization.',
    },
    {
      icon: '🤖',
      title: 'AI Assistant',
      description: 'Real-time voice commands and intelligent assistance powered by advanced AI.',
    },
    {
      icon: '🔋',
      title: 'Long Battery Life',
      description: 'All-day battery with fast charging support for uninterrupted use.',
    },
    {
      icon: '💡',
      title: 'Smart Display',
      description: 'Augmented reality overlay with customizable widgets and notifications.',
    },
    {
      icon: '🎨',
      title: 'Premium Design',
      description: 'Lightweight, comfortable frames with modern, futuristic aesthetics.',
    },
    {
      icon: '🔒',
      title: 'Privacy First',
      description: 'Built-in privacy controls and secure data encryption for your peace of mind.',
    },
  ]

  return (
    <section className="container mx-auto px-4 py-20">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
          Powerful Features
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Everything you need in a single, elegant device
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="glass rounded-2xl p-6 hover:glass-strong transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Features

