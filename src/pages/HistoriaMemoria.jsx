import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Feedback from '../components/Feedback'

function HistoriaMemoria() {
  return (
    <section className="history-page section-divider">
      <div className="history-page-copy">
        <span className="section-kicker">
          LA NUEVA VUELTA / NARRATIVA TRANSMEDIA
        </span>

        <h1 className="page-title">El negocio de la memoria con lentejuelas</h1>
        <div className="red-underline"></div>

        <article className="history-story">
          <p>
            Hay un punto exacto en la televisión colombiana donde la tragedia
            deja de ser noticia y se convierte en franquicia. Pasa siempre
            igual: agarras las masacres, los operativos a medianoche y los
            testaferros de perfil bajo, y los pasas por la licuadora del prime
            time. El resultado es una receta infalible: una paleta de colores
            sobresaturada, actores con la sonrisa demasiado perfecta y una
            banda sonora donde el acordeón y la guitarra eléctrica suenan con
            la misma urgencia de un gol en la final.
          </p>

          <p>
            La última súper producción que se estrenó por ahí, como pasó con
            <em> El cartel de los sapos</em> o <em>Escobar, el patrón del mal</em>,
            de esas que anuncian con bombos y platillos como “el retrato
            definitivo de lo que fuimos”, es el ejemplo perfecto de cómo
            nuestra televisión lleva años aplaudiéndose a sí misma por
            maquillar monstruos.
          </p>

          <p>
            Desde el primer capítulo, la maquinaria te atrapa. No se puede
            negar que la factura técnica es impecable; la dirección de arte
            cuida cada detalle de la época y los protagonistas tienen ese imán
            en la mirada que te deja pegado al sofá. Pero el problema nunca ha
            sido el talento de los actores o la plata que le meten a la
            producción, sino la brújula moral del cuento.
          </p>

          <p>
            La historia te la sabes de memoria: el pelado de barrio, arrastrado
            por la miseria y el abandono del Estado, descubre que el atajo de la
            ilegalidad es la única forma de dejar de ser un don nadie. Los
            libretistas, por supuesto, cumplen con la cuota de decencia que
            exige el horario: el tipo sufre, la mamá llora en una cocina humilde
            y, por allá en el antepenúltimo capítulo, la justicia o las balas le
            cobran la cuenta. El detalle es que el remordimiento dura tres
            minutos, y la fiesta dura ochenta episodios.
          </p>

          <p>
            Durante meses al aire, el capo de turno no es el asesino que
            destruyó familias enteras, sino un estratega entrañable. Es el
            novio detallista, el amigo leal que mata por los suyos y el
            justiciero de pueblo que hace lo que los políticos corruptos roban
            y no hacen. La serie se gasta todos sus recursos en humanizar al
            bandido hasta volverlo irresistible, mientras que la ley y las
            instituciones quedan como un chiste malo: un montón de funcionarios
            inútiles o vendidos.
          </p>

          <p>
            Esa trampa es la que vuelve el fenómeno tan jodidamente confuso.
            Uno no se sienta a las nueve de la noche a esperar que capturen al
            criminal; uno se sienta a ver cómo se las ingenia para burlar al
            cerco una vez más. Y claro, la vida real después imita a la pantalla.
            En las esquinas se repiten las frases de los libretos, los alias se
            vuelven títulos de nobleza y el lujo traqueto se disfraza de
            “superación personal”.
          </p>

          <p>
            Los canales se escudan siempre en el mismo latiguillo: “Nosotros
            solo contamos lo que pasó, la televisión es un espejo de la
            realidad”. Pero ahí está el truco. Una cosa es ponerle la cara a
            una herida abierta para que duela, y otra muy distinta es ponerle
            lentejuelas y vender la entrada al circo.
          </p>

          <p>
            Al final, cuando se apaga la tele y suena el último acorde, queda
            la amarga sensación de que nos encanta aplaudir a los mismos que
            nos terminaron cavando la fosa.
          </p>
        </article>

        <div className="history-page-outro">
          <h2 className="handwritten">¿Es solo ficción?</h2>
          <Link to="/capitulos" className="red-button">
            EXPLORAR CAPÍTULOS <ArrowRight size={18} />
          </Link>
          <Link
            to="/historia/espejo"
            className="history-story-arrow history-story-arrow-previous history-story-arrow-single"
            aria-label="Volver a El espejo de cristal y barro"
            title="Historia anterior"
          >
            <ArrowLeft size={24} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="history-page-art">
        <img src={`${import.meta.env.BASE_URL}images/Historia-3.png`} alt="Ilustración de El negocio de la memoria con lentejuelas" />
      </div>
      <Feedback contentId="historia-3" title="El negocio de la memoria con lentejuelas" />
    </section>
  )
}

export default HistoriaMemoria