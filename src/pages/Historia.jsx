import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Feedback from '../components/Feedback'

function Historia() {
  return (
    <section className="history-page section-divider">
      <div className="history-page-copy">
        <span className="section-kicker">
          LA NUEVA VUELTA / NARRATIVA TRANSMEDIA
        </span>

        <h1 className="page-title">
          El pez muere por la boca
        </h1>
        <div className="red-underline"></div>

        <article className="history-story">
          <p>
            ¿Quién no ha usado esta frase en una conversación o la ha escuchado
            al menos una vez? Lo cierto es que este dicho popular refleja la
            profunda influencia del narcotráfico en nuestra sociedad,
            manifestada con especial fuerza en miles de jóvenes expuestos a un
            estilo de vida sustentado en la búsqueda de poder, legitimación y
            dominación.
          </p>

          <p>
            Aunque la problemática se debate desde la década de 1980, el
            fenómeno conceptual fue nombrado formalmente a comienzos de los
            años 2000. Académicos como Luis Astorga en México y Omar Rincón en
            Colombia institucionalizaron el análisis de la «narcocultura» como
            objeto de estudio sociológico, permitiendo que el término
            transcurriera de los titulares locales a los ensayos universitarios.
          </p>

          <p>
            Pero, ¿de qué se trata realmente? Aunque existen múltiples
            aproximaciones teóricas, las definiciones coinciden en un punto
            central: la narcocultura es el conjunto de normas, prácticas,
            hábitos de consumo, expresiones culturales y conductas derivadas
            de los actores del tráfico ilícito de drogas.
          </p>

          <p>
            El análisis cultural plantea que la búsqueda de validación en el
            narcotráfico no responde a un mero capricho, sino a la necesidad
            urgente de transformar el capital ilícito en estatus, respeto y
            legitimidad social. Dado que la mayoría de sus integrantes
            proviene de sectores históricamente marginados o excluidos, el
            dinero por sí solo no les otorga un lugar dentro de la «sociedad
            formal».
          </p>

          <p>
            Por ello, el cambio de estatus busca imponer su propio estándar de
            éxito mediante el consumo ostentoso: marcas de alto lujo, joyería
            sobredimensionada, mansiones e inmuebles de alta gama. No se
            persigue la elegancia discreta, sino el impacto visual inmediato.
            Tras experimentar la marginación y la ausencia del Estado, muchos
            capos buscan sustituir la institucionalidad en sus comunidades de
            origen para ganar afecto, protección y respaldo social. Un claro
            ejemplo histórico es Pablo Escobar en Medellín, quien proyectó la
            imagen de un «Robin Hood moderno» mientras infundía terror en
            rivales y autoridades para consolidar su dominio.
          </p>

          <p>
            Este fenómeno se amplifica cuando producciones audiovisuales
            —como <em>Pablo Escobar: El patrón del mal</em> o <em>Sin senos no
            hay paraíso</em>— provocan que el público romantice o se identifique
            con este estilo de vida, impactando de manera crítica a los jóvenes
            en búsqueda de identidad. Aunque el material no pretende enaltecer
            a los personajes, la ficción queda abierta a múltiples
            interpretaciones.
          </p>

          <p>
            Un caso ilustrativo ocurrió en Venezuela hacia 2011 y 2012 con la
            serie animada <em>Cárcel o Infierno</em>. La producción relataba la
            historia de «Cara e' Muerto», un joven recluido que debía adaptarse
            a un entorno hostil marcado por la violencia y las traiciones hasta
            convertirse en el «pran» del centro penitenciario. A pesar de que
            su creador declaró en entrevistas que el objetivo era prevenir que
            la juventud idealizara los lujos y el dinero fácil, el resultado
            demostró cómo la ficción puede cruzar la línea hacia la
            desensibilización del espectador. En lugar de disuadir, estas
            narrativas terminan normalizando patrones de conducta y
            consolidando una estética que se perpetúa entre las nuevas
            generaciones.
          </p>
        </article>

        <div className="history-page-outro">
          <h2 className="handwritten">¿Es solo ficción?</h2>
          <Link to="/capitulos" className="red-button">
            EXPLORAR CAPÍTULOS <ArrowRight size={18} />
          </Link>
          <Link
            to="/historia/espejo"
            className="history-story-arrow history-story-arrow-next history-story-arrow-single"
            aria-label="Siguiente historia: El espejo de cristal y barro"
            title="Siguiente historia"
          >
            <ArrowRight size={24} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="history-page-art">
        <img src={`${import.meta.env.BASE_URL}images/Historia-1.png`} alt="Ilustración de la primera historia" />
      </div>
      <Feedback contentId="historia-1" title="El pez muere por la boca" />
    </section>
  )
}

export default Historia
