import { NavLink } from 'react-router-dom'
import { FaSpotify, FaInstagram } from 'react-icons/fa'
import { FaTiktok } from 'react-icons/fa6'

function Navbar() {
  return (
    <header className="navbar">

      <NavLink to="/" className="brand">
        <img src="/images/logo.jpeg" alt="La Nueva Vuelta" />
      </NavLink>

      <nav className="nav-links">
        <NavLink to="/">INICIO</NavLink>
        <NavLink to="/capitulos">PODCAST</NavLink>
        <NavLink to="/historia">HISTORIA</NavLink>
      </nav>

      <div className="social-links">
        <a href="https://open.spotify.com/show/623GeplPWJ2dpjRCQaHv78?si=5FkYJMlUR8WaHEa9SZA_EQ&utm_source=whatsapp" target="_blank" rel="noreferrer" aria-label="Spotify">
          <FaSpotify />
        </a>

        <a href="https://www.instagram.com/lanuevavuelta?xtok=bmQxNXQzOTR6ZjVz" target="_blank" rel="noreferrer" aria-label="Instagram">
          <FaInstagram />
        </a>

        <a href="https://vm.tiktok.com/ZS9fnDNDG1B8u-J9K5M/" target="_blank" rel="noreferrer" aria-label="TikTok">
          <FaTiktok />
        </a>
      </div>

    </header>
  )
}

export default Navbar
