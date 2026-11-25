import Feedback from '../components/Feedback'

const VIDEO_URL = import.meta.env.VITE_VIDEO_URL || `${import.meta.env.BASE_URL}videos/la-narco-cultura.mp4`

function getEmbedUrl(url) {
  if (!url) return ''
  try {
    const parsedUrl = new URL(url)
    if (parsedUrl.hostname === 'youtu.be') return `https://www.youtube.com/embed/${parsedUrl.pathname.slice(1)}`
    if (parsedUrl.hostname.endsWith('youtube.com') && parsedUrl.pathname === '/watch') {
      return `https://www.youtube.com/embed/${parsedUrl.searchParams.get('v')}`
    }
  } catch {
    return url
  }
  return url
}

function Blogs() {
  const videoUrl = getEmbedUrl(VIDEO_URL)
  const isDirectVideo = /\.(mp4|webm|ogg)(\?.*)?$/i.test(videoUrl)

  return (
    <section className="blogs-page">
      <div className="blogs-video">
        {videoUrl ? (
          isDirectVideo ? (
            <video
              src={videoUrl}
              controls
              playsInline
              preload="metadata"
              aria-label="Video de La Nueva Vuelta"
            />
          ) : (
            <iframe
              src={videoUrl}
              title="Video de La Nueva Vuelta"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )
        ) : (
          <div className="blogs-placeholder">
            <span className="section-kicker">LA NUEVA VUELTA / BLOGS</span>
            <h1 className="page-title">Muy pronto</h1>
            <p>El video aparecerá aquí cuando compartas el enlace.</p>
          </div>
        )}
      </div>
      <div className="blogs-feedback">
        <Feedback contentId="video-principal" title="Video de Blogs" />
      </div>
    </section>
  )
}

export default Blogs
