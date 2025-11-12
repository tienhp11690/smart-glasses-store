import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import HomeEnhanced from './pages/HomeEnhanced'
import Catalogue from './pages/Catalogue'
import ProductDetail from './pages/ProductDetail'
import UserGuide from './pages/UserGuide'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home-preview" element={<HomeEnhanced />} />
              <Route path="/catalogue" element={<Catalogue />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/user-guide" element={<UserGuide />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App

