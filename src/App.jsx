import './styles/App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Characters from './pages/Characters'
import Movies from './pages/Movies'
import NotFound from './pages/NotFound'
import Contact from './pages/Contact'
import Downloads from './pages/Downloads'
import './styles/global.css'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    const ogg = new Audio('/audio/Not_Found.ogg')
    const mp3 = new Audio('/audio/Not_Found.mp3')

    ogg.preload = 'auto'
    mp3.preload = 'auto'

    ogg.load()
    mp3.load()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/characters' element={<Characters />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/downloads' element={<Downloads />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App