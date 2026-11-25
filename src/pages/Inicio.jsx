import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

function Inicio() {
  return (
    <section className="hero hero-inicio">

      <img
        src={`${import.meta.env.BASE_URL}images/portada-inicio.png`}
        alt="La Nueva Vuelta"
        className="hero-background"
      />

      <div className="hero-circle-copy">

        <h2>
          ¡Explora nuestro universo y descubre todo lo que tenemos para contarte!
        </h2>

        <p>
          Una propuesta transmedia que se expande mediante historias,
          contenidos y plataformas digitales, buscando conectar con
          jóvenes de 17 a 23 años y comprender su impacto en esta población.
        </p>

      </div>

      <Link to="/historia" className="red-button hero-start">
        EMPEZAR
        <ArrowRight size={20} />
      </Link>

    </section>
  )
}

export default Inicio