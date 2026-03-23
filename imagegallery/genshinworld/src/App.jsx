import React, { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Intro from './components/Intro.jsx'
import Venti from './components/venti.jsx'

const App = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // If the user reloads or enters on a different path, force redirect to Intro
    if (location.pathname !== '/') {
      navigate('/', { replace: true })
    }
  }, []) // Empty dependency array ensures this runs only on mount (reload)

  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/characters" element={<Venti />} />
    </Routes>
  )
}

export default App