import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Intro from './components/Intro.jsx'
import CharacterGallery from './components/CharacterGallery.jsx'
import PaimonHub from './components/UI/PaimonHub.jsx'
import RegionsPage from './components/Regions/Region.jsx'
import ElementsPage from './components/ElementsandReaction/Elements.jsx'

const App = () => {
  const navigate = useNavigate()

  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/hub" element={<PaimonHub onBack={() => navigate('/characters')} />} />
      <Route path="/regions" element={<RegionsPage onBack={() => navigate('/hub')} />} />
      <Route path="/elements" element={<ElementsPage onBack={() => navigate('/hub')} />} />
      <Route path="/archons" element={<CharacterGallery />} />
      <Route path="/characters" element={<CharacterGallery />} />
    </Routes>
  )
}

export default App