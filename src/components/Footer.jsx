import { FaSpotify, FaInstagram } from 'react-icons/fa'
import { FaTiktok } from 'react-icons/fa6'

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-logo">
        <img src={`${import.meta.env.BASE_URL}images/logo-footer.png`} alt="Logo La Nueva Vuelta" />
      </div>

      <p>
        LA NUEVA VUELTA <span>/</span>
        NARRATIVA TRANSMEDIA <span>/</span>
        SOBRE LA NARCOESTÉTICA
      </p>

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

    </footer>
  )
}

export default Footer
