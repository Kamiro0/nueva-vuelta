import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function HistoriaEspejo() {
  return (
    <section className="history-page section-divider">
      <div className="history-page-copy">
        <span className="section-kicker">
          LA NUEVA VUELTA / NARRATIVA TRANSMEDIA
        </span>

        <h1 className="page-title">El espejo de cristal y barro</h1>
        <div className="red-underline"></div>

        <article className="history-story">
          <p>
            A las ocho de la noche el barrio quedaba solo, pero no por miedo ni
            por el frío que bajaba de la montaña, sino porque en casi todas las
            casas se encendía la misma luz azul. Todo el mundo se acomodaba
            frente al televisor para ver la serie sobre el Patrón de males de
            Antioquia: la historia del pelado de Envigado que, a punta de
            astucia, plata y plomo, puso a temblar a todo un país y terminó
            volviéndose el tipo más rico del mundo.
          </p>

          <p>
            Para los muchachos que se criaron entre callejones de ladrillo
            limpio, esa pantalla no era solo para pasar el rato. Era como un
            manual de instrucciones. Veían cómo el tipo regalaba canchas de
            fútbol, construía barrios enteros y repartía fajos de dólares a los
            pelados de las comunas. Frente a la realidad de ver a los papás
            matándose doce horas al día en una construcción o vendiendo en el
            centro para apenas pagar el arriendo, el cuento del Patrón se
            sentía como la única salida lógica.
          </p>

          <p>
            En las esquinas de la cuadra, la cosa se fue pegando sin pedir
            permiso. Los apodos cambiaron, los pelaos empezaron a caminar
            sacando el pecho, con la libreta de notas al bolsillo, la medallita
            del Santo Niño de Atocha colgada al cuello y repitiendo tal cual el
            acento y los dichos de la novela: “Sí o qué, mi pez”, “Usted me dirá
            si hacemos negocio o le mando a enfriar la vuelta”. Meterse de
            campanero en la esquina o subir a la colina a cuidar un puesto para
            el combo del sector ya no daba miedo; para muchos era, simplemente,
            el primer paso para volverse un “duro”.
          </p>

          <p>
            Pero a la televisión se le olvidaba mostrar la parte más fea del
            libreto. En la pantalla, cuando el capo daba una orden o mandaba a
            poner un carro bomba, la toma salía dramática, con música de
            tensión, y el tipo salía victorioso. En la calle, las bombas no
            eran efectos especiales: volaban a la gente de a pie, al vecino que
            iba a trabajar o al muchacho que iba cruzando la calle.
          </p>

          <p>
            La burbuja se reventó una noche de aguacero en la cancha del barrio,
            esa misma cancha que en la serie mostraban cuando el capo la
            inauguraba. Un tropel feo entre combos rivales dejó a uno de los
            pelaos del sector tirado en el piso con dos impactos en el pecho.
            Ahí no hubo escenas heroicas, ni tomas en cámara lenta, ni milagros
            de guion: solo el frío del pavimento mojado, la sangre mezclándose
            con el agua de la lluvia y el golpe seco de darse cuenta de que la
            vida real no perdona ni da segunda temporada.
          </p>

          <p>
            Durante los meses de clínica, la mentira de la riqueza y el poder
            se cayó a pedazos. Mientras en la novela el Patrón convalecía
            escondido en caletas de lujo con médicos privados, en la vida real
            le tocó a la mamá del pelado ponerse a hacer rifas, vender empanadas
            en la esquina y pedir fiado en la farmacia para comprar las pastas,
            los antibióticos y las gasas. Ahí fue que se vio la verdadera
            trampa: la televisión te vende el mito del hombre poderoso que
            ayuda al pueblo, pero la factura de los platos rotos la terminan
            pagando las mamás llorando en un pasillo de hospital.
          </p>

          <p>
            Con el tiempo, varios de los pelados que se salvaron de milagro
            prefirieron abrirse de las esquinas. Se juntaron con otros vecinos
            y empezaron a coger los celulares y cámaras prestadas para grabar
            lo que de verdad pasa en el barrio: el camello diario de las doñas,
            los pelados que hacen rap y breakdance para desahogarse, y las
            historias de las víctimas que la televisión siempre dejó como
            simples números de fondo.
          </p>

          <p>
            La serie de Pablo Escobar sigue rompiendo récords de sintonía en
            plataformas y canales de todo el mundo. Pero en las cuadras de la
            comuna, cada vez son más los que entienden que no hay que comerle
            cuento a la pantalla: la mítica frase de “plata o plomo” en la vida
            real solo deja muertos, dolor y familias destruidas.
          </p>
        </article>

        <div className="history-page-outro">
          <h2 className="handwritten">¿Es solo ficción?</h2>
          <Link to="/capitulos" className="red-button">
            EXPLORAR CAPÍTULOS <ArrowRight size={18} />
          </Link>
          <Link
            to="/historia"
            className="history-story-arrow history-story-arrow-previous"
            aria-label="Volver a la primera historia"
            title="Historia anterior"
          >
            <ArrowLeft size={24} aria-hidden="true" />
          </Link>
          <Link
            to="/historia/memoria"
            className="history-story-arrow history-story-arrow-next"
            aria-label="Siguiente historia: El negocio de la memoria con lentejuelas"
            title="Siguiente historia"
          >
            <ArrowRight size={24} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="history-page-art">
        <img src="/images/Historia-2.png" alt="Ilustración de El espejo de cristal y barro" />
      </div>
    </section>
  )
}

export default HistoriaEspejo