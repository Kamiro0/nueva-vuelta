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
          Ya no me sorprende un traqueto. Y eso es lo que más miedo me da.
        </h1>
        <div className="red-underline"></div>

        <article className="history-story">
          <p>
            Un hombre criado entre novelas de las ocho descubre que, sin darse
            cuenta, terminó normalizando aquello que un día juró detestar.
          </p>

          <p>
            Me llamo Jhon Jairo. Sí, como medio barrio. Vivo en Bogotá, aunque
            podría vivir en Medellín, Cali o cualquier lugar de Colombia. Nací
            donde todo el mundo tiene un tío que “hizo plata”, un vecino que
            “trabaja por fuera” y alguien que todavía dice que Pablo Escobar
            ayudó más que el Estado.
          </p>

          <p>
            Crecí viendo novelas. Primero porque mi mamá las veía. Después
            porque todo el mundo hablaba de ellas. Y cuando menos pensé, ya
            sabía quién era “el duro”, quién era “la prepago”, quién era el
            sicario más leal y hasta cuál era la camioneta que tocaba tener
            para que lo respetaran. Nunca me pregunté por qué. Solo pasaba.
            Como pasa todo en Colombia.
          </p>

          <p>
            Uno prende el televisor y ahí está otra vez. Otro capo. Otra mujer
            operada hasta la sonrisa. Otro chino creyendo que el billete fácil
            es un atajo. Otra frase de “plata o plomo” convertida en meme. Y
            uno sigue comiendo. Sigue riéndose. Sigue viendo el siguiente
            capítulo.
          </p>

          <p>
            Hasta que un día me pasó algo muy paila. Escuché a un pelado decir
            que quería ser como el personaje de una narconovela. No estaba
            hablando del malo. Estaba hablando del exitoso. Ahí fue cuando
            entendí que el problema nunca fue solamente el narcotráfico. El
            problema fue cuando dejamos de verlo como una tragedia y empezamos
            a verlo como entretenimiento.
          </p>

          <blockquote>
            <p>Nos aprendimos los apodos de los capos...</p>
            <p>...pero se nos olvidaron los nombres de las víctimas.</p>
          </blockquote>

          <blockquote>
            <p>Nos sabemos las frases de los personajes...</p>
            <p>...pero no las historias de las familias que todavía siguen
              buscando justicia.</p>
          </blockquote>

          <p>
            Y mientras más series salen... ...menos nos incomoda ver una
            camioneta blindada, un reloj de millones o una finca llena de
            lujos. Como si todo eso ya hiciera parte del paisaje.
          </p>

          <p>
            Entonces me hice una pregunta que todavía no puedo responder. ¿Las
            narconovelas cuentan lo que somos... o terminaron enseñándonos qué
            admirar? Porque una cosa es contar la historia. Y otra muy distinta
            es hacer que el villano termine siendo el personaje favorito.
          </p>

          <p>
            Tal vez el problema nunca estuvo en la pantalla. Tal vez siempre
            estuvo en nosotros. En las veces que aplaudimos. En las veces que
            repetimos las frases. En las veces que dijimos “qué chimba de
            personaje”, olvidando que detrás de esa ficción hubo bombas,
            secuestros, desplazamientos y miles de muertos.
          </p>

          <p>
            Hoy apago el televisor, pero esta vez no para cambiar de canal. Lo
            apago porque ya no quiero seguir viendo estas historias sin
            preguntarme qué dejaron en mí. No pretendo convencer a nadie de
            dejar de ver narconovelas. Lo que sí quiero es dejar de
            tragármelas sin pensar.
          </p>

          <p>
            Porque si yo crecí creyendo que todo eso era normal, ¿a cuántos más
            les habrá pasado lo mismo? Por eso decidí empezar esta conversación.
            ¿También le ha pasado? ¿Alguna vez admiró a un personaje y después
            se preguntó por qué? ¿Recuerda la primera narconovela que vio? ¿Qué
            imagen del éxito, del poder o de la violencia le dejó? Quiero leer
            esas historias, esas dudas y esas incomodidades.
          </p>

          <p>
            Tal vez, si empezamos a hablar de ellas, podamos entender cuánto de
            esa narcoestética sigue viviendo entre nosotros. Lo invito a
            recorrer este especial y a participar. Porque cuestionar lo que
            hemos normalizado también es una forma de cambiar la historia.
          </p>

          <h2 className="history-sources-title">Bibliografía consultada</h2>
          <ul className="history-sources">
            <li>
              Amaya, J. F. T. (2015). Retórica, Argumentación e Identificación
              en la Narco Telenovela colombiana. Intersticios. Revista
              sociológica de pensamiento crítico, 9(2).
            </li>
            <li>
              Alvarado, X. B., &amp; Bonilla, C. M. (2025). Narcotelenovelas y
              narcoésteticas: del entretenimiento a la necropolítica. Revista
              NUPEM, 17(40).
            </li>
            <li>
              Peña-Cañas, J. J., &amp; Galán-Fajardo, H. (2025). Plata o plomo:
              40 años de narcoficciones (1982-2022). Palabra Clave, 28(1).
            </li>
            <li>
              Rincón, O. (2019). TV-violencias: Mejor contados en la ficción
              que en la información. Revista de Estudios Hispánicos, 53(1),
              187-209.
            </li>
            <li>
              Vera Castro, W. (2021). Narconovela: un análisis crítico a la
              telenovela del narcotráfico en Colombia, su aparición y
              continuidad en la primera década del siglo XXI (tesis doctoral,
              Universidad Nacional de La Plata).
            </li>
          </ul>
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
      <Feedback contentId="historia-1" title="Ya no me sorprende un traqueto" />
    </section>
  )
}

export default Historia
