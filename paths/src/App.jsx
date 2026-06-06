import '@styles/App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '@pages/Home'
import Sobre from '@pages/Sobre'
import Contato from '@pages/Contato'
import Characters from '@pages/Characters'
import NotFound from '@pages/404'
import '@styles/global.css'
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
        <Route path='/sobre' element={<Sobre />} />
        <Route path='/contato' element={<Contato />} />
        <Route path='/characters' element={<Characters />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App