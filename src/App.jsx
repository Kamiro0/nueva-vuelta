
import { useLayoutEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Inicio from './pages/Inicio'
import Capitulos from './pages/Capitulos'
import Historia from './pages/Historia'
import HistoriaEspejo from './pages/HistoriaEspejo'
import HistoriaMemoria from './pages/HistoriaMemoria'

function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <ScrollToTop />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/capitulos" element={<Capitulos />} />
          <Route path="/historia/memoria" element={<HistoriaMemoria />} />
          <Route path="/historia/espejo" element={<HistoriaEspejo />} />
          <Route path="/historia" element={<Historia />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
