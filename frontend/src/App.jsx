import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SidebarComponent from './components/SidebarComponent'
import Home from './pages/Home'
import Relatorio from './pages/Relatorio'

function App() {
  const isLargeScreen = window.innerWidth >= 768;

  return (
    <BrowserRouter>
      <div className='d-flex'>
        <SidebarComponent />
        <div className='flex-grow-1 p-4 content'
        >
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/relatorios' element={<Relatorio />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
