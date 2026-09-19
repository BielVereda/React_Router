import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import About from './screens/About';
import Characters from './screens/Characters';
import Movies from './screens/Movies';
import Games from './screens/Games';
import Models from './screens/Models';
import NotFound from './screens/NotFound';
import Contact from './screens/Contact';
import Downloads from './screens/Downloads';
import AliceGame from './screens/AliceGame';
import History from './screens/History';
import { useEffect } from 'react';

// Game System
import { GameProvider, useGame } from './context/GameContext';
import TitleScreen from './components/TitleScreen';
import EventGateway from './components/EventGateway';
import YouDiedScreen from './components/YouDiedScreen';
import { usePageEvent } from './hooks/usePageEvent';

/** Inner shell — needs router context for usePageEvent */
function AppShell() {
  const { state, hasSave } = useGame();

  // Watch route changes and fire game events (desktop only, non-home)
  usePageEvent();

  // Preload audio
  useEffect(() => {
    const ogg = new Audio('/audio/Not_Found.ogg');
    const mp3 = new Audio('/audio/Not_Found.mp3');
    ogg.preload = 'auto';
    mp3.preload = 'auto';
    ogg.load();
    mp3.load();
  }, []);

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
        <Route path='/history' element={<History />} />
        <Route path='/project-alice' element={<AliceGame />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/downloads' element={<Downloads />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;