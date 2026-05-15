import { useState, useEffect, useRef } from 'react';
import { FoodMap } from './components/FoodMap';
import logo from './assets/logo.png';

type Page = 'home' | 'map';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Mono:wght@300;400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cream: #f5f0e8;
    --ink: #1a1a1a;
    --ink-light: #4a4540;
    --rule: #d4cec4;
    --accent: #c9472b;
  }

  html, body, #root { height: 100%; }

  body {
    background: var(--cream);
    color: var(--ink);
    font-family: 'DM Mono', monospace;
    overflow-x: hidden;
  }

  /* ── NAV ── */
  .nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 32px;
    mix-blend-mode: multiply;
  }

  .nav-wordmark {
    font-family: 'DM Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--ink);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .nav-wordmark.visible { opacity: 1; }

  .hamburger {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 4px;
  }

  .hamburger span {
    display: block;
    width: 24px;
    height: 1.5px;
    background: var(--ink);
    transition: all 0.3s ease;
    transform-origin: center;
  }

  .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity: 0; }
  .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

  /* ── DRAWER ── */
  .drawer {
    position: fixed;
    inset: 0;
    z-index: 99;
    background: var(--ink);
    color: var(--cream);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 64px;
    transform: translateX(100%);
    transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
  }

  .drawer.open { transform: translateX(0); }

  .drawer-nav-item {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.5rem, 7vw, 5rem);
    font-weight: 400;
    color: var(--cream);
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    padding: 12px 0;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    transition: color 0.2s, padding-left 0.2s;
    opacity: 0.5;
  }

  .drawer-nav-item:last-child { border-bottom: none; }
  .drawer-nav-item:hover, .drawer-nav-item.active { opacity: 1; padding-left: 16px; }
  .drawer-nav-item.active { color: var(--cream); font-style: italic; }

  .drawer-footer {
    position: absolute;
    bottom: 40px;
    left: 64px;
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
  }

  /* ── HOME PAGE ── */
  .home {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Hero */
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 80px 32px 60px;
    border-bottom: 1px solid var(--rule);
  }

  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 60%, rgba(201,71,43,0.06) 0%, transparent 70%);
    pointer-events: none;
  }

  .hero-eyebrow {
    font-size: 0.6rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--ink-light);
    margin-bottom: 40px;
  }

  .hero-logo {
    width: clamp(140px, 22vw, 220px);
    margin-bottom: 36px;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeUp 0.9s 0.2s forwards;
  }

  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.2rem, 6vw, 5rem);
    font-weight: 400;
    text-align: center;
    line-height: 1.1;
    max-width: 900px;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeUp 0.9s 0.4s forwards;
  }

  .hero-title em {
    font-style: italic;
    color: var(--accent);
  }

  .hero-subtitle {
    margin-top: 20px;
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--ink-light);
    text-align: center;
    opacity: 0;
    animation: fadeUp 0.9s 0.6s forwards;
  }

  .hero-cta {
    margin-top: 52px;
    opacity: 0;
    animation: fadeUp 0.9s 0.8s forwards;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: var(--ink);
    color: var(--cream);
    border: none;
    padding: 14px 32px;
    font-family: 'DM Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s, gap 0.2s;
  }

  .btn-primary:hover { background: var(--accent); gap: 16px; }

  .hero-scroll-hint {
    position: absolute;
    bottom: 28px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--rule);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    opacity: 0;
    animation: scrollHintFade 1s 1.2s forwards;
  }

@keyframes scrollHintFade {
    to { opacity: 1; }
}

  .scroll-line {
    width: 1px;
    height: 32px;
    background: var(--rule);
    transform-origin: center;
    animation: scrollPulse 1.8s ease-in-out infinite;
  }

  /* About */
  .about {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 80vh;
    border-bottom: 1px solid var(--rule);
  }

  @media (max-width: 700px) {
    .about { grid-template-columns: 1fr; }
    .about-right { border-left: none !important; border-top: 1px solid var(--rule); }
  }

  .about-left {
    padding: 80px 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .about-label {
    font-size: 0.6rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--ink-light);
    margin-bottom: 24px;
  }

  .about-heading {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 3.5vw, 2.8rem);
    font-weight: 400;
    line-height: 1.2;
    margin-bottom: 28px;
  }

  .about-body {
    font-size: 0.8rem;
    line-height: 1.9;
    color: var(--ink-light);
    max-width: 420px;
  }

  .about-body p + p { margin-top: 16px; }

  .about-right {
    border-left: 1px solid var(--rule);
    padding: 80px 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .about-stat {
    padding: 28px 0;
    border-bottom: 1px solid var(--rule);
  }

  .about-stat:first-child { border-top: 1px solid var(--rule); }

  .stat-number {
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    font-weight: 400;
    color: var(--accent);
    line-height: 1;
  }

  .stat-label {
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--ink-light);
    margin-top: 6px;
  }

  .about-map-cta {
    margin-top: 40px;
  }

  /* Footer */
  .footer {
    padding: 40px 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.6rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--rule);
    border-top: 1px solid var(--rule);
  }

  /* ── MAP PAGE ── */
  .map-page {
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding-top: 72px;
  }

  .map-page-header {
    padding: 16px 32px;
    border-bottom: 1px solid var(--rule);
    display: flex;
    align-items: baseline;
    gap: 16px;
  }

  .map-page-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    font-weight: 400;
  }

  .map-page-subtitle {
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink-light);
  }

  .map-wrapper { flex: 1; }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp {
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes scrollPulse {
    0%, 100% { opacity: 0.3; transform: scaleY(1); }
    50% { opacity: 1; transform: scaleY(1.3); }
  }

  /* Page transitions */
  .page-enter {
    opacity: 0;
    transform: translateY(12px);
    animation: fadeUp 0.5s forwards;
  }
`;

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const homeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = homeRef.current;
    if (!el || page !== 'home') return;
    const onScroll = () => setScrolled(el.scrollTop > 60);
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, [page]);

  const navigate = (p: Page) => {
    setPage(p);
    setMenuOpen(false);
    setScrolled(false);
  };

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav className="nav">
        <span className={`nav-wordmark ${scrolled || page === 'map' ? 'visible' : ''}`}>
          Neighborhood Niche
        </span>
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* DRAWER */}
      <div className={`drawer ${menuOpen ? 'open' : ''}`}>
        <button className={`drawer-nav-item ${page === 'home' ? 'active' : ''}`} onClick={() => navigate('home')}>
          Home
        </button>
        <button className={`drawer-nav-item ${page === 'map' ? 'active' : ''}`} onClick={() => navigate('map')}>
          The Map
        </button>
        <div className="drawer-footer">Friends Seminary · Class of 2026</div>
      </div>

      {/* HOME */}
      {page === 'home' && (
        <div className="home page-enter" ref={homeRef} style={{ overflowY: 'auto', height: '100vh' }}>

          {/* Hero */}
          <section className="hero">
            <p className="hero-eyebrow">Friends Seminary · Union Square · Est. 2026</p>
            <img
              className="hero-logo"
              src={logo}
              alt="Neighborhood Niche"
            />
            <h1 className="hero-title">
              <em>The Neighborhood Niche</em>
            </h1>
            <p className="hero-subtitle">An interactive guide to Gramercy community & cuisine</p>
            <div className="hero-cta">
              <button className="btn-primary" onClick={() => navigate('map')}>
                View the Map <span>→</span>
              </button>
            </div>
            <div className="hero-scroll-hint">
              <span>Scroll</span>
              <div className="scroll-line" />
            </div>
          </section>

          {/* About */}
          <section className="about">
            <div className="about-left">
              <p className="about-label">About the project</p>
              <h2 className="about-heading">Beyond the chain.<br />Inside the neighborhood.</h2>
              <div className="about-body">
                <p>
                  Neighborhood Niche is a senior project by Emmett Cohen and Eli Edmonds,
                  12th graders at Friends Seminary. We set out to map the independent food spots
                  and local businesses that make our block worth knowing.
                </p>
                <p>
                  Every entry includes photography, a menu recommendation under $15,
                  and a deeper look — owner interviews, oral histories, or the cultural
                  story behind the food.
                </p>
                <p>
                  This map is for every Friends student who wants to explore their neighborhood,
                  eat well, and spend their money on people who actually live and work here.
                </p>
              </div>
            </div>

            <div className="about-right">
              <div>
                <div className="about-stat">
                  <div className="stat-number">15</div>
                  <div className="stat-label">Local spots featured</div>
                </div>
                <div className="about-stat">
                  <div className="stat-number">$15</div>
                  <div className="stat-label">Maximum price per entry</div>
                </div>
                <div className="about-stat">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Independent businesses</div>
                </div>
              </div>
              <div className="about-map-cta">
                <button className="btn-primary" onClick={() => navigate('map')}>
                  Explore the map <span>→</span>
                </button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="footer">
            <span>Neighborhood Niche © 2026</span>
            <span>Emmett Cohen & Eli Edmonds · Friends Seminary</span>
          </footer>
        </div>
      )}

      {/* MAP */}
      {page === 'map' && (
        <div className="map-page page-enter">
          <div className="map-page-header">
            <span className="map-page-title">The Map</span>
            <span className="map-page-subtitle">Union Square & East Vilage · Independent businesses only</span>
          </div>
          <div className="map-wrapper">
            <FoodMap />
          </div>
        </div>
      )}
    </>
  );
}