import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Intro from './components/Intro.jsx'
import CharacterGallery from './components/CharacterGallery.jsx'
import PaimonHub from './components/UI/PaimonHub.jsx'
import RegionsPage from './components/Regions/Region.jsx'
import ElementsPage from './components/Elements.jsx'
import FactionsOrders from './components/Fractionsandorders.jsx'
import AbyssCelestia from './components/Abysss.jsx'
import Artifacts from './components/Artifacts.jsx'

const App = () => {
  const navigate = useNavigate()

  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/hub" element={<PaimonHub onBack={() => navigate('/')} />} />
      <Route path="/regions" element={<RegionsPage onBack={() => navigate('/hub')} />} />
      <Route path="/elements" element={<ElementsPage onBack={() => navigate('/hub')} />} />
      <Route path="/factions" element={<FactionsOrders onBack={() => navigate('/hub')} />} />
      <Route path="/abyss" element={<AbyssCelestia onBack={() => navigate('/hub')} />} />
      <Route path="/artifacts" element={<Artifacts onBack={() => navigate('/hub')} />} />
      <Route path="/archons" element={<CharacterGallery onBack={() => navigate('/hub')} />} />
      <Route path="/characters" element={<CharacterGallery onBack={() => navigate('/')} />} />
    </Routes>
  )
}

export default App