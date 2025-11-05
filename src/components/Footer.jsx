import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="glass border-t border-white/10 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-gradient mb-4">SmartVision</h3>
            <p className="text-gray-400 text-sm">
              The future of wearable technology. AI-powered smart glasses that revolutionize how you see and interact with the world.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/catalogue" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  Catalogue
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Email: info@smartvision.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Tech Street, San Francisco, CA</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} SmartVision. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

