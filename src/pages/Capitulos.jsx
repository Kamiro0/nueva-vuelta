import { ArrowDown, ArrowRight, ArrowUp } from 'lucide-react'

const episodes = [
  {
    number: '01',
    title: 'ENTRANDO AL MUNDO',
    description: 'Colombia vivió una época marcada por el narcotráfico, el miedo y la violencia. ¿Cómo pasó todo esto y cómo una historia real terminó convirtiéndose en ficción? Viajemos a los años ochenta y noventa para descubrirlo.',
    image: '/images/Episodio-1.jpeg',
    link: 'https://open.spotify.com/episode/027PnuLG0X9OINYWR1qFve?si=NhzRyXi8RTaaDRM7DvN0QA&utm_source=copy-link',
  },
  {
    number: '02',
    title: 'ATRAPADOS',
    description: '¿Por qué, aunque sabíamos que estábamos viendo historias llenas de peligro y conflictos, no podíamos dejar de verlas? En este segundo capítulo de La Nueva Vuelta nos metemos del otro lado de la pantalla para entender qué hizo que las narconovelas nos atraparan tanto. Hablamos de la curiosidad, la tensión y la forma en que estas historias lograron involucrarnos mientras, casi sin darnos cuenta, aprendíamos a reconocer sus propias reglas y códigos.',
    image: '/images/Episodio-2.jpeg',
    link: 'https://open.spotify.com/episode/0vCshz78OoCQzpbKKfUqpX?si=IWSF4IjXQIWMMXcz77R-tw&utm_source=copy-link',
  },
  {
    number: '03',
    title: 'UNA PALABRITA',
    description: '¿En qué momento el narcotráfico pasó de las noticias a convertirse en historias que veíamos capítulo tras capítulo? En este primer episodio de La Nueva Vuelta, nos devolvemos al comienzo de las narconovelas para entender cómo estas historias llegaron a nuestras pantallas.',
    image: '/images/Episodio-3.jpeg',
    link: 'https://open.spotify.com/episode/6I055ewFp6kaxfgFjz4VwC?si=p9HEyIAKSRu7NCYOcP1ncQ',
  },
]

function Capitulos() {
  return (
    <section className="inner-page section-divider">
      <span className="section-kicker">LA NUEVA VUELTA / PODCAST</span>
      <h1 className="page-title">PODCAST</h1>
      <div className="red-underline"></div>

      <p className="page-intro">
        Tres episodios. Una historia que se construye
        poco a poco. Escucha nuestra narrativa.
      </p>

      <div className="episodes-grid">
        {episodes.map((episode) => {
          const imageFirst = episode.number === '02'
          const imageSlot = (
            <div
              className="episode-image-slot"
              role="img"
              aria-label={`Imagen del episodio ${episode.number}: ${episode.title}`}
            >
              <span>EPISODIO {episode.number}</span>
              <img
                src={episode.image}
                alt={`Episodio ${episode.number}: ${episode.title}`}
                onError={(event) => {
                  event.currentTarget.hidden = true
                }}
              />
            </div>
          )
          const imageLink = (
            <a
              className="episode-image-link"
              href={episode.link}
              target="_blank"
              rel="noreferrer"
              aria-label={`Abrir episodio ${episode.number} en Spotify`}
            >
              {imageSlot}
              <span className="episode-image-action">ABRIR EPISODIO <ArrowRight size={16} /></span>
            </a>
          )

          return (
          <article className={`episode-item${imageFirst ? ' episode-item-reversed' : ''}`} key={episode.number}>
            {imageFirst && imageLink}
            {imageFirst && <ArrowUp className="episode-arrow" size={24} aria-hidden="true" />}

            <div className="episode-copy">
              <span>EPISODIO {episode.number}</span>
              <h2>{episode.title}</h2>
              <p>{episode.description}</p>
            </div>

            {!imageFirst && <ArrowDown className="episode-arrow" size={24} aria-hidden="true" />}
            {!imageFirst && imageLink}
          </article>
          )
        })}
      </div>
    </section>
  )
}

export default Capitulos
