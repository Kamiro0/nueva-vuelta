
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Inicio from './pages/Inicio'
import Capitulos from './pages/Capitulos'
import Historia from './pages/Historia'
import HistoriaEspejo from './pages/HistoriaEspejo'
import HistoriaMemoria from './pages/HistoriaMemoria'

function App() {
  return (
    <div className="app-shell">
      <Navbar />

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
