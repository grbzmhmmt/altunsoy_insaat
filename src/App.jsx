import './App.css'
import { useEffect, useRef, useState } from 'react'
import { Routes, Route, Link, Outlet, useLocation } from 'react-router-dom'
import Loft41Page from './pages/Loft41.jsx'
import BodrumVillalariPage from './pages/BodrumVillalari.jsx'

const INSTAGRAM_URL = 'https://www.instagram.com/altunsoyinsaat_/'

function Navbar({ theme, onToggleTheme, menuOpen, onToggleMenu }) {
  return (
    <header className="app-header">
      <Link to="/" className="brand-link" aria-label="Ana sayfaya git">
        <div className="logo-title">
          <div className="brand-mark" aria-hidden="true">
              <img src={theme === 'dark' ? '/img/dashboard/logo_white.png' : '/img/dashboard/logo.png'} alt="" />
          </div>
          <div>
            <h1>Altunsoy İnşaat</h1>
              <p className="subtitle">Her proje, yeni bir imza</p>
          </div>
        </div>
      </Link>
      <nav className="nav-links">
        <div className="nav-projects">
          <span className="nav-label">Projelerimiz</span>
          <div className="nav-project-links">
            <Link to="/projeler/loft41" onClick={() => onToggleMenu(false)}>
              Loft41
            </Link>
            <Link to="/projeler/bodrum-villalari" onClick={() => onToggleMenu(false)}>
              Bodrum Villaları
            </Link>
          </div>
        </div>
        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Açık tema' : 'Koyu tema'}
        >
          <span className="theme-icon">{theme === 'dark' ? '☀︎' : '☾'}</span>
        </button>
        <button
          type="button"
          className="menu-toggle"
          aria-label="Projeler menüsünü aç/kapat"
          aria-expanded={menuOpen}
          onClick={() => onToggleMenu(!menuOpen)}
        >
          <span className="menu-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </nav>
    </header>
  )
}

function SideMenu({ menuOpen, onClose }) {
  return (
    <>
      <div
        className={`menu-overlay ${menuOpen ? 'is-open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`side-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <button type="button" className="side-menu-close" onClick={onClose} aria-label="Menüyü kapat">
          ✕
        </button>
        <div className="side-menu-content">
          <span className="side-menu-title">Projelerimiz</span>
          <Link to="/projeler/loft41" onClick={onClose}>
            Loft41
          </Link>
          <Link to="/projeler/bodrum-villalari" onClick={onClose}>
            Bodrum Villaları
          </Link>
        </div>
      </aside>
    </>
  )
}

function Layout({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const setMenuOpenState = (value) => {
    setMenuOpen(value)
  }

  return (
    <div className="app-root">
      <Navbar
        theme={theme}
        onToggleTheme={onToggleTheme}
        menuOpen={menuOpen}
        onToggleMenu={setMenuOpenState}
      />
      <SideMenu menuOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="app-main">
        <Outlet />
      </main>
      <footer className="app-footer">
        <div className="footer-content">
          <span>Güven, kalite ve estetik mimari</span>
          <span>© {new Date().getFullYear()} Altunsoy İnşaat. Tüm hakları saklıdır.</span>
        </div>
      </footer>
    </div>
  )
}

function Dashboard() {
  const videoRef = useRef(null)

  useEffect(() => {
    if (!videoRef.current) return
    try {
      // Videoyu biraz yavaşlat
      // 1 normal hız, 0.5 yarı hız; 0.7 daha hafif bir yavaşlatma
      videoRef.current.playbackRate = 0.7
    } catch (e) {
      // bazı tarayıcılar engellerse sessizce geç
    }
  }, [])

  return (
    <div className="dashboard">
      <div className="dashboard-bg" aria-hidden="true">
        <video
          ref={videoRef}
          className="dashboard-bg-video"
          src="/img/dashboard/dahsboard_video.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="dashboard-bg-overlay" />
        <div className="dashboard-logo-center">
          <img
            className="dashboard-logo dashboard-logo-light"
            src="/img/dashboard/logo.png"
            alt="Altunsoy İnşaat Logo"
          />
          <img
            className="dashboard-logo dashboard-logo-dark"
            src="/img/dashboard/logo_white.png"
            alt="Altunsoy İnşaat Logo"
          />
        </div>
      </div>

      <section className="projects-grid">
        <h3>Projelerimiz</h3>
        <div className="cards">
          <Link
            to="/projeler/loft41"
            className="project-card"
            style={{ '--card-bg': "url('/img/project/loft41/loft41_main_dark.jpg')" }}
          >
            <div className="card-badge">Kocaeli / Başiskele</div>
            <h4>Loft41</h4>
            <p>Başiskele&apos;de modern loft yaşamı. Yüksek tavanlı, ferah ve şık tasarım.</p>
            <span className="card-link">Projeyi incele →</span>
          </Link>
          <Link
            to="/projeler/bodrum-villalari"
            className="project-card"
            style={{ '--card-bg': "url('/img/project/bodrum/bodrum_main_image.jpg')" }}
          >
            <div className="card-badge">Kocaeli / Başiskele</div>
            <h4>Bodrum Villaları</h4>
            <p>Başiskele&apos;de doğayla iç içe, özel havuzlu ve geniş teraslı villa konsepti.</p>
            <span className="card-link">Projeyi incele →</span>
          </Link>
        </div>
      </section>

      <section className="contact-section">
        <div>
          <h3>İletişim</h3>
          <p>
            Projelerimiz hakkında detaylı bilgi almak veya randevu oluşturmak için bizimle
            iletişime geçin.
          </p>
          <div className="contact-actions">
            <a href="tel:+905426846134" className="primary-btn">
              Hemen Ara
            </a>
            <a href="mailto:info@altunsoyinsaat.com" className="secondary-btn">
              Teklif Al
            </a>
          </div>
          <div className="contact-grid">
            <div className="contact-item">
              <span>Telefon</span>
              <a href="tel:+905426846134">0 542 684 61 34</a>
            </div>
            <div className="contact-item">
              <span>E-posta</span>
              <a href="mailto:info@altunsoyinsaat.com">info@altunsoyinsaat.com</a>
            </div>
            <div className="contact-item">
              <span>Instagram</span>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                Altunsoy İnşaat
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="media-section">
        <div className="media-content">
          <div className="media-text">
            <h3>Medyalarımız</h3>
            <p>Sosyal medyada projelerimiz ve güncel paylaşımlarımızı takip edebilirsiniz.</p>
          </div>
          <div className="media-buttons">
            <a
              className="media-btn"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <img src="/img/dashboard/instagram.png" alt="Instagram" />
              <span className="media-label">Instagram</span>
            </a>
            <a
              className="media-btn"
              href="https://wa.me/905426846134"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp ile ara"
            >
              <img src="/img/dashboard/whatsapp.png" alt="WhatsApp" />
              <span className="media-label">WhatsApp</span>
            </a>
            <a
              className="media-btn"
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter)"
            >
              <img
                className="media-icon-light"
                src="/img/dashboard/twitter.png"
                alt="X (Twitter)"
              />
              <img
                className="media-icon-dark"
                src="/img/dashboard/twitter_white.jpg"
                alt="X (Twitter)"
              />
              <span className="media-label">X</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return null
}

function App() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('altunsoy-theme')
      if (stored === 'dark' || stored === 'light') {
        setTheme(stored)
        return
      }
    } catch (e) {
      // localStorage erişilemezse varsayılanı kullan
    }

    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
    setTheme(prefersDark ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('theme-dark', 'theme-light')
    const cls = theme === 'dark' ? 'theme-dark' : 'theme-light'
    root.classList.add(cls)
    try {
      window.localStorage.setItem('altunsoy-theme', theme)
    } catch (e) {
      // yoksay
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout theme={theme} onToggleTheme={toggleTheme} />}>
          <Route index element={<Dashboard />} />
          <Route path="/projeler/loft41" element={<Loft41Page />} />
          <Route path="/projeler/bodrum-villalari" element={<BodrumVillalariPage />} />
          <Route
            path="*"
            element={
              <div className="project-page">
                <div className="project-top">
                  <div>
                    <p className="breadcrumb">
                      <Link to="/">Dashboard</Link> <span>›</span> <span>Sayfa bulunamadı</span>
                    </p>
                    <h2 className="project-title">404</h2>
                    <p className="project-subtitle">Aradığınız sayfa bulunamadı. Dashboard’a dönebilirsiniz.</p>
                  </div>
                </div>
              </div>
            }
          />
        </Route>
      </Routes>
    </>
  )
}

export default App
