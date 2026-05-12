import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Career from './Career.jsx'

// Handle GitHub Pages SPA routing
function RoutingHandler() {
  const navigate = useNavigate()
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const route = params.get('route')
    
    if (route) {
      // Clean URL without replacing history
      window.history.replaceState({}, '', window.location.pathname)
      navigate(route, { replace: true })
    }
  }, [navigate])
  
  return null
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/Preschool">
      <RoutingHandler />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/career" element={<Career />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
