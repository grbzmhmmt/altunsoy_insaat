import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import VideoModal from '../components/VideoModal.jsx'
import ImageModal from '../components/ImageModal.jsx'

export default function BodrumVillalariPage() {
  const images = useMemo(
    () => [
      { src: '/img/project/bodrum/bodrum_main_image.jpg', alt: 'Bodrum Villaları ana görsel' },
      { src: '/img/project/bodrum/bodrum_procejt.jpg', alt: 'Bodrum Villaları proje görseli' },
      { src: '/img/project/bodrum/bodrum_stairs_img.jpg', alt: 'Bodrum Villaları merdiven detayı' },
    ],
    [],
  )

  const videos = useMemo(
    () => [
      {
        title: 'Proje Ana Video',
        src: '/img/project/bodrum/bodrum_project_main.mp4',
        thumb: '/img/project/bodrum/bodrum_main_image.jpg',
      },
      {
        title: 'Dış Mekan Video',
        src: '/img/project/bodrum/bodrum_outside.mp4',
        thumb: '/img/project/bodrum/bodrum_procejt.jpg',
      },
      {
        title: 'Hareketli Görünüm',
        src: '/img/project/bodrum/bodrum_project_moving.mp4',
        thumb: '/img/project/bodrum/bodrum_stairs_img.jpg',
      },
      {
        title: 'Detay Dış Mekan',
        src: '/img/project/bodrum/bodrum_detail_outside.mp4',
        thumb: '/img/project/bodrum/bodrum_main_image.jpg',
      },
      {
        title: 'İç Mekan (Hole)',
        src: '/img/project/bodrum/bodrum_hole.mp4',
        thumb: '/img/project/bodrum/bodrum_procejt.jpg',
      },
      {
        title: 'Mobil Unreal',
        src: '/img/project/bodrum/bodrum_unreal_for_mobile.mp4',
        thumb: '/img/project/bodrum/bodrum_main_image.jpg',
      },
    ],
    [],
  )

  const [activeVideo, setActiveVideo] = useState(null)
  const [activeImage, setActiveImage] = useState(null)
  const floatingLogos = useMemo(() => {
    const rows = 3
    const cols = 4
    const positions = []
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        const jitterX = (Math.random() * 10 - 5).toFixed(1)
        const jitterY = (Math.random() * 10 - 5).toFixed(1)
        const top = Math.min(92, Math.max(8, ((r + 0.5) / rows) * 100 + Number(jitterY)))
        const left = Math.min(92, Math.max(8, ((c + 0.5) / cols) * 100 + Number(jitterX)))
        positions.push({
          id: positions.length,
          top: `${top}%`,
          left: `${left}%`,
          size: `${50 + Math.random() * 70}px`,
          duration: `${6 + Math.random() * 6}s`,
          delay: `${-Math.random() * 12}s`,
          driftX: `${(Math.random() * 50 - 25).toFixed(1)}px`,
          driftY: `${(Math.random() * 50 - 25).toFixed(1)}px`,
          driftR: `${(Math.random() * 16 - 8).toFixed(1)}deg`,
        })
      }
    }
    return positions.slice(0, 10)
  }, [])

  const activeImageIndex = activeImage
    ? images.findIndex((img) => img.src === activeImage.src)
    : -1
  const activeVideoIndex = activeVideo
    ? videos.findIndex((v) => v.src === activeVideo.src)
    : -1

  return (
    <div className="project-page">
      <div className="project-bg" aria-hidden="true">
        {floatingLogos.map((logo) => (
          <span
            key={logo.id}
            className="project-bg-logo"
            style={{
              top: logo.top,
              left: logo.left,
              width: logo.size,
              height: logo.size,
              animationDuration: logo.duration,
              animationDelay: logo.delay,
              '--float-x': logo.driftX,
              '--float-y': logo.driftY,
              '--float-rot': logo.driftR,
            }}
          />
        ))}
      </div>
      <div className="project-top">
        <div>
          <h2 className="project-title">Bodrum Villaları</h2>
          <p className="project-subtitle">
            Kocaeli Başiskele&apos;de modern çizgiler ve konforu bir araya getiren villa konsepti.
            Geniş teraslar, ferah yaşam alanları ve doğayla iç içe kurgulanan peyzaj düzeniyle
            günlük yaşamı ayrıcalıklı hale getirir. Her detay, uzun ömürlü ve rahat bir kullanım
            için tasarlandı.
          </p>
        </div>

        <div className="project-actions">
          <a className="ghost-btn" href="tel:+900000000000">
            Telefon
          </a>
          <a className="ghost-btn" href="mailto:info@altunsoyinsaat.com">
            E-posta
          </a>
        </div>
      </div>

      <section className="project-section">
        <h3>Galeri</h3>
        <div className="gallery-grid">
          {images.map((img) => (
            <button
              key={img.src}
              type="button"
              className="gallery-item"
              data-title={img.alt}
              onClick={() => setActiveImage(img)}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
            </button>
          ))}
          {videos.map((v) => (
            <button
              key={v.src}
              type="button"
              className="gallery-item gallery-item-video"
              data-title={v.title}
              onClick={() => setActiveVideo(v)}
            >
              <img src={v.thumb} alt={v.title} loading="lazy" />
              <div className="gallery-video-overlay">
                <div className="gallery-video-play">▶</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <VideoModal
        isOpen={Boolean(activeVideo)}
        title={activeVideo?.title}
        src={activeVideo?.src}
        onClose={() => setActiveVideo(null)}
        hasPrev={activeVideoIndex > 0}
        hasNext={activeVideoIndex >= 0 && activeVideoIndex < videos.length - 1}
        onPrev={() => setActiveVideo(videos[activeVideoIndex - 1])}
        onNext={() => setActiveVideo(videos[activeVideoIndex + 1])}
      />
      <ImageModal
        isOpen={Boolean(activeImage)}
        title={activeImage?.alt}
        src={activeImage?.src}
        onClose={() => setActiveImage(null)}
        hasPrev={activeImageIndex > 0}
        hasNext={activeImageIndex >= 0 && activeImageIndex < images.length - 1}
        onPrev={() => setActiveImage(images[activeImageIndex - 1])}
        onNext={() => setActiveImage(images[activeImageIndex + 1])}
      />
    </div>
  )
}


