import '@styles/App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '@pages/Home'
import Sobre from '@pages/Sobre'
import Contato from '@pages/Contato'
import NotFound from '@pages/404' // importa a página 404
import '@styles/global.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sobre' element={<Sobre />} />
        <Route path='/contato' element={<Contato />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
