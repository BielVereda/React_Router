import './styles/App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Characters from './pages/Characters'
import Movies from './pages/Movies'
import Games from './pages/Games'
import Models from './pages/Models'
import NotFound from './pages/NotFound'
import Contact from './pages/Contact'
import Downloads from './pages/Downloads'
import './styles/global.css'
import { useEffect } from 'react'

// Game System
import { GameProvider, useGame } from './context/GameContext'
import TitleScreen from './components/game/TitleScreen'
import EventGateway from './components/game/EventGateway'
import YouDiedScreen from './components/game/YouDiedScreen'
import { usePageEvent } from './hooks/usePageEvent'

/** Inner shell — needs router context for usePageEvent */
function AppShell() {
  const { state, hasSave } = useGame()

  // Watch route changes and fire game events (desktop only, non-home)
  usePageEvent()

  // Preload audio
  useEffect(() => {
    const ogg = new Audio('/audio/Not_Found.ogg')
    const mp3 = new Audio('/audio/Not_Found.mp3')
    ogg.preload = 'auto'
    mp3.preload = 'auto'
    ogg.load()
    mp3.load()
  }, [])

  return (
    <>
      {/* Show title screen until game is started */}
      {!state.isGameStarted && <TitleScreen hasSave={hasSave} />}

      {/* You Died overlay (auto-shows title screen after 3s) */}
      <YouDiedScreen />

      {/* Active game event (item / boss / puzzle) */}
      <EventGateway />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/characters' element={<Characters />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/games' element={<Games />} />
        <Route path='/models3d' element={<Models />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/downloads' element={<Downloads />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </GameProvider>
  )
}

export default App