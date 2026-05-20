import { SpeedInsights } from "@vercel/speed-insights/next"
import { useState, useEffect, useRef } from 'react';
import { FoodMap } from './components/FoodMap';
import logo from './assets/logo.png';
import nishaan from './assets/nishaanhighlight.jpeg';
import pizzazz from './assets/pizzazzhighlight.jpg';
import miniGourmet from './assets/minigourmethighlight.jpg';
import aboutPhoto from './assets/aboutphoto.jpg';

type Page = 'home' | 'map';

const T = {
  cream: '#f5f0e8',
  ink: '#1a1a1a',
  inkLight: '#4a4540',
  rule: '#d4cec4',
  accent: '#c9472b',
  fontDisplay: "'Playfair Display', serif",
  fontMono: "'DM Mono', monospace",
};

function useWindowWidth() {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => {
    const handler = () => setW(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return w;
}

const FEATURED = [
  {
    id: 1,
    spotId: '1',
    name: 'Nishaan',
    tag: 'Pakistani Chopped Cheese',
    description:
      'A true original. Nishaan puts a South Asian spin on a New York classic with bold Pakistani-American spices and flavors that make it unlike anything else in the neighborhood. The Ghee chocolate chip cookie is a must-add to your order.',
    emoji: '🧀',
    bg: '#e0d8e8',
    img: nishaan,
  },
  {
    id: 2,
    spotId: '2',
    name: 'Pizzazz',
    tag: 'Personal Pies',
    description:
      'Personal sized neopolitan pizzas to go. Every pizza is made from scratch and cooked right when you order. Pizzazz combines fresh ingredients, amazing flavor, and a warm sense of hospitality that makes every customer feel like a regular by their second visit.',
    emoji: '🍕',
    bg: '#e8d8d0',
    img: pizzazz,
  },
  {
    id: 3,
    spotId: '3',
    name: 'Mini Gourmet Deli',
    tag: 'The OG',
    description:
      'The spot that inspired it all. This window-deli is home to $3 empanadas and fresh smoothies. Our grab-and-go go-to for a quick cheap bite to bring back to school or the park.',
    emoji: '🥪',
    bg: '#e8e0d0',
    img: miniGourmet,
  },
];

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Mono:wght@300;400&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { height: 100%; }
  body { background: ${T.cream}; color: ${T.ink}; font-family: ${T.fontMono}; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
  ::selection { background: ${T.ink}; color: ${T.cream}; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .anim-1 { opacity: 0; animation: fadeUp 0.8s 0.1s forwards; }
  .anim-2 { opacity: 0; animation: fadeUp 0.8s 0.3s forwards; }
  .anim-3 { opacity: 0; animation: fadeUp 0.8s 0.5s forwards; }
  .anim-4 { opacity: 0; animation: fadeUp 0.8s 0.7s forwards; }
  .anim-5 { opacity: 0; animation: fadeUp 0.8s 0.9s forwards; }
  .anim-page { opacity: 0; animation: fadeUp 0.4s forwards; }

  .hamburger { background: none; border: none; cursor: pointer; display: flex; flex-direction: column; gap: 5px; padding: 4px; }
  .hamburger span { display: block; width: 24px; height: 1.5px; background: ${T.ink}; transition: all 0.3s ease; transform-origin: center; }
  .hamburger.open span { background: ${T.cream}; }
  .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

  .drawer-btn {
    font-family: ${T.fontDisplay}; font-size: clamp(2rem, 6vw, 4.5rem); font-weight: 400;
    color: ${T.cream}; background: none; border: none; cursor: pointer;
    text-align: left; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.08);
    transition: opacity 0.2s, padding-left 0.25s; opacity: 0.4; width: 100%;
  }
  .drawer-btn:last-of-type { border-bottom: none; }
  .drawer-btn:hover { opacity: 1; padding-left: 20px; }
  .drawer-btn.active { opacity: 1; font-style: italic; }

  .btn-primary {
    display: inline-flex; align-items: center; gap: 10px;
    background: ${T.ink}; color: ${T.cream}; border: 1px solid ${T.ink};
    padding: 14px 32px; font-family: ${T.fontMono}; font-size: 0.68rem;
    letter-spacing: 0.15em; text-transform: uppercase; cursor: pointer;
    transition: background 0.2s, gap 0.2s;
  }
  .btn-primary:hover { background: ${T.accent}; border-color: ${T.accent}; gap: 18px; }

  .btn-outline {
    display: inline-flex; align-items: center; gap: 10px;
    background: transparent; color: ${T.ink}; border: 1px solid ${T.ink};
    padding: 13px 30px; font-family: ${T.fontMono}; font-size: 0.68rem;
    letter-spacing: 0.15em; text-transform: uppercase; cursor: pointer;
    transition: background 0.2s, color 0.2s, gap 0.2s; text-decoration: none;
  }
  .btn-outline:hover { background: ${T.ink}; color: ${T.cream}; gap: 18px; }

  .spot-card {
    transition: box-shadow 0.3s, transform 0.2s;
    cursor: pointer;
  }
  .spot-card:hover { box-shadow: 0 8px 40px rgba(0,0,0,0.1); transform: translateY(-2px); }
  .spot-img { transition: transform 0.5s ease; }
  .spot-card:hover .spot-img { transform: scale(1.05); }
`;

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openSpotId, setOpenSpotId] = useState<string | null>(null);
  const homeRef = useRef<HTMLDivElement>(null);
  const w = useWindowWidth();
  const sm = w < 640;
  const md = w < 960;

  useEffect(() => {
    const el = homeRef.current;
    if (!el || page !== 'home') return;
    const onScroll = () => setScrolled(el.scrollTop > 60);
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, [page]);

  const navigate = (p: Page, spotId?: string) => {
    setPage(p);
    setMenuOpen(false);
    setScrolled(false);
    setOpenSpotId(spotId ?? null);
  };

  const px = sm ? '24px' : md ? '48px' : '80px';
  const py = sm ? '56px' : '88px';

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      {/* ── Nav ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: `${sm ? 14 : 18}px ${sm ? 20 : 36}px`,
        background: scrolled || page === 'map' ? T.cream : 'transparent',
        borderBottom: scrolled || page === 'map' ? `1px solid ${T.rule}` : '1px solid transparent',
        transition: 'background 0.3s, border-color 0.3s',
      }}>
        {page === 'map' ? (
          <img
            src={logo}
            alt="Home"
            onClick={() => navigate('home')}
            style={{ height: 60, cursor: 'pointer', opacity: 1, transition: 'opacity 0.2s' }}
            onMouseOver={e => (e.currentTarget.style.opacity = '0.7')}
            onMouseOut={e => (e.currentTarget.style.opacity = '1')}
          />
        ) : (
          <span
            onClick={() => navigate('home')}
            style={{
              fontFamily: T.fontMono, fontSize: '0.62rem', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: T.ink, cursor: 'pointer',
              opacity: scrolled ? 1 : 0, transition: 'opacity 0.35s',
              pointerEvents: scrolled ? 'auto' : 'none',
            }}
          >
            Neighborhood Niche
          </span>
        )}
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          style={{ position: 'relative', zIndex: 201 }}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* ── Drawer ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 199,
        background: T.ink,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: `0 ${sm ? 32 : 80}px`,
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.55s cubic-bezier(0.76, 0, 0.24, 1)',
      }}>
        <button className={`drawer-btn${page === 'home' ? ' active' : ''}`} onClick={() => navigate('home')}>Home</button>
        <button className={`drawer-btn${page === 'map' ? ' active' : ''}`} onClick={() => navigate('map')}>The Map</button>
        <div style={{
          position: 'absolute', bottom: 36, left: sm ? 32 : 80,
          fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.22)',
        }}>
          Friends Seminary · Class of 2026
        </div>
      </div>

      {/* ══════════════ HOME PAGE ══════════════ */}
      {page === 'home' && (
        <div className="anim-page" ref={homeRef} style={{ overflowY: 'auto', height: '100vh' }}>

          {/* Hero */}
          <section style={{
            minHeight: '100vh', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', position: 'relative',
            padding: `100px ${px} 100px`,
            borderBottom: `1px solid ${T.rule}`,
            background: `radial-gradient(ellipse at 50% 55%, rgba(201,71,43,0.07) 0%, transparent 65%)`,
          }}>
            <p className="anim-1" style={{
              fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase',
              color: T.inkLight, marginBottom: 32, textAlign: 'center',
            }}>
              Friends Seminary · Union Square · Est. 2026
            </p>
            <img className="anim-2" src={logo} alt="Neighborhood Niche" style={{ width: sm ? 110 : 180, marginBottom: 28 }} />
            <h1 className="anim-3" style={{
              fontFamily: T.fontDisplay,
              fontSize: sm ? 'clamp(1.9rem, 9vw, 2.8rem)' : 'clamp(2.8rem, 5.5vw, 5rem)',
              fontWeight: 400, textAlign: 'center', lineHeight: 1.1,
              fontStyle: 'italic', color: T.accent,
            }}>
              The Neighborhood Niche
            </h1>
            <p className="anim-4" style={{
              marginTop: 16, fontSize: '0.72rem', letterSpacing: '0.15em',
              textTransform: 'uppercase', color: T.inkLight, textAlign: 'center',
            }}>
              Independent food. Student prices. Right around the corner of Friends.
            </p>
            <div className="anim-5" style={{ marginTop: 44 }}>
              <button className="btn-primary" onClick={() => navigate('map')}>
                View the Map <span>→</span>
              </button>
            </div>
          </section>

          {/* About the Project */}
          <section style={{
            display: 'grid',
            gridTemplateColumns: sm ? '1fr' : '1fr 1fr',
            borderBottom: `1px solid ${T.rule}`,
          }}>
            <div style={{ padding: `${py} ${px}` }}>
              <p style={{
                fontSize: '0.8rem', letterSpacing: '0.25em', textTransform: 'uppercase',
                color: T.inkLight, marginBottom: 18,
              }}>About the project</p>
              <h2 style={{
                fontFamily: T.fontDisplay,
                fontSize: sm ? '1.7rem' : 'clamp(1.8rem, 2.8vw, 2.5rem)',
                fontWeight: 400, lineHeight: 1.2, marginBottom: 28,
              }}>
                Eat local, spend local.
              </h2>
              <div style={{ fontSize: '0.81rem', lineHeight: 1.9, color: T.inkLight }}>
                <p>Neighborhood Niche is a senior project by Eli Edmonds and Emmett Cohen (Friends Seminary '26). Over four weeks, we walked the blocks around our school and ate our way through the neighborhood, searching for independent, locally owned businesses within walking distance of Friends that serve great food at student-friendly prices.</p>
                <p style={{ marginTop: 14 }}>Lunch in New York can get expensive fast. But eating affordably should not have to mean settling for the same chains every day. The neighborhood around Friends is full of incredible food, remarkable people, and small businesses with stories worth knowing. You just have to know where to look.</p>
                <p style={{ marginTop: 14 }}>The goal of this project is to help the Friends community discover those places. Every spot on this map was chosen not just for the food, but for the people behind it: the owners, families, and communities that make our neighborhood feel alive. Our hope is that this interactive guide encourages students to explore more of the city around them and support the local businesses that give it character.</p>
              </div>
            </div>

            <div style={{
              borderLeft: sm ? 'none' : `1px solid ${T.rule}`,
              borderTop: sm ? `1px solid ${T.rule}` : 'none',
              padding: `${py} ${px}`,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 32,
            }}>
              <div>
                {[
                  { n: '14', label: 'Local spots featured' },
                  { n: '0.5 mi', label: 'Maximum distance from Friends' },
                  { n: '$15', label: 'Maximum price' },
                  { n: '100%', label: 'Independent businesses' },
                ].map(({ n, label }) => (
                  <div key={label} style={{ padding: '22px 0', borderBottom: `1px solid ${T.rule}` }}>
                    <div style={{
                      fontFamily: T.fontDisplay, fontSize: '3.4rem',
                      fontWeight: 400, color: T.accent, lineHeight: 1,
                    }}>{n}</div>
                    <div style={{
                      fontSize: '0.62rem', letterSpacing: '0.15em',
                      textTransform: 'uppercase', color: T.inkLight, marginTop: 6,
                    }}>{label}</div>
                  </div>
                ))}
              </div>
              <button className="btn-primary" onClick={() => navigate('map')}>
                Explore the map <span>→</span>
              </button>
            </div>
          </section>

          {/* Featured Spots */}
          <section style={{ padding: `${py} ${px}`, borderBottom: `1px solid ${T.rule}` }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
              marginBottom: 44, flexWrap: 'wrap', gap: 16,
            }}>
              <div>
                <p style={{
                  fontSize: '0.8rem', letterSpacing: '0.25em', textTransform: 'uppercase',
                  color: T.inkLight, marginBottom: 10,
                }}>Must try</p>
                <h2 style={{
                  fontFamily: T.fontDisplay,
                  fontSize: sm ? '1.7rem' : 'clamp(1.8rem, 2.8vw, 2.4rem)',
                  fontWeight: 400,
                }}>Our Top Three</h2>
              </div>
              <button className="btn-outline" onClick={() => navigate('map')}>
                See all spots <span>→</span>
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: sm ? '1fr' : md ? '1fr 1fr' : '1fr 1fr 1fr',
              gap: sm ? 16 : 8,
            }}>
              {FEATURED.map(spot => (
                <div
                  key={spot.id}
                  className="spot-card"
                  onClick={() => navigate('map', spot.spotId)}
                  style={{
                    border: `1px solid ${T.rule}`,
                    display: 'flex', flexDirection: 'column', overflow: 'hidden',
                  }}
                >
                  <div style={{
                    aspectRatio: '1 / 1', overflow: 'hidden',
                    background: spot.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {spot.img ? (
                      <img
                        className="spot-img"
                        src={spot.img}
                        alt={spot.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    ) : (
                      <span className="spot-img" style={{ fontSize: '4rem' }}>{spot.emoji}</span>
                    )}
                  </div>
                  <div style={{ padding: '22px 26px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{
                      display: 'flex', justifyContent: 'space-between',
                      alignItems: 'flex-start', marginBottom: 10, gap: 8,
                    }}>
                      <h3 style={{
                        fontFamily: T.fontDisplay, fontSize: '1.2rem',
                        fontWeight: 400, lineHeight: 1.2,
                      }}>{spot.name}</h3>
                      <span style={{
                        fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                        background: T.ink, color: T.cream,
                        padding: '3px 8px', whiteSpace: 'nowrap', marginTop: 3, flexShrink: 0,
                      }}>{spot.tag}</span>
                    </div>
                    <p style={{ fontSize: '0.79rem', lineHeight: 1.8, color: T.inkLight }}>
                      {spot.description}
                    </p>
                    <p style={{
                      marginTop: 16, fontSize: '0.65rem', letterSpacing: '0.12em',
                      textTransform: 'uppercase', color: T.accent,
                    }}>
                      View on map →
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* About Us */}
          <section style={{
            display: 'grid',
            gridTemplateColumns: sm ? '1fr' : '1fr 1fr',
            borderBottom: `1px solid ${T.rule}`,
          }}>
            {/* Left: photo */}
            <div style={{
              padding: `${py} ${px}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: sm ? 260 : 338,
                height: sm ? 260 : 338,
                borderRadius: '50%',
                overflow: 'hidden',
                border: `1px solid ${T.rule}`,
                background: '#e8e4dc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <img
                  src={aboutPhoto}
                  alt="Emmett and Eli"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>

            {/* Right: text */}
            <div style={{
              borderLeft: sm ? 'none' : `1px solid ${T.rule}`,
              borderTop: sm ? `1px solid ${T.rule}` : 'none',
              padding: `${py} ${px}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <p style={{
                fontSize: '0.8rem', letterSpacing: '0.25em', textTransform: 'uppercase',
                color: T.inkLight, marginBottom: 18,
              }}>About us</p>
              <h2 style={{
                fontFamily: T.fontDisplay,
                fontSize: sm ? '1.7rem' : 'clamp(1.8rem, 2.8vw, 2.5rem)',
                fontWeight: 400, lineHeight: 1.2, marginBottom: 28,
              }}>
                Emmett & Eli
              </h2>
              <div style={{ fontSize: '0.81rem', lineHeight: 1.9, color: T.inkLight }}>
                <p>We're Eli Edmonds and Emmett Cohen, seniors at Friends Seminary in the Class of 2026. We both love food, and have spent high school searching for new places to try on the days we venture out of the cafeteria for lunch.</p>
                <p style={{ marginTop: 14 }}>For Eli, it all started with a tiny window deli on 14th Street selling $3 empanadas. It quickly became a regular lunch spot and sparked a curiosity about the other overlooked neighborhood spots hidden just blocks from school. For Emmett, the inspiration came from his first visit to Pizzazz, a local pizza shop where the owner welcomed him with an unusual warmth and generosity. He immediately wanted to learn the story behind the business and find others like it.</p>
                <p style={{ marginTop: 14 }}>We shared our finds with each other and realized how many great spots Friends students were missing out on. We hope this map is useful to every Friends student who comes after us, and that it inspires others to look beyond the chains to the people and places that make the neighborhood special.</p>              
              </div>

              <div style={{ marginTop: 32 }}>
                <button className="btn-primary" onClick={() => navigate('map')}>
                  View the Map <span>→</span>
                </button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer style={{
            position: 'relative',
            padding: sm ? '28px 24px' : '36px 80px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.57rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: T.inkLight,
            borderTop: `1px solid ${T.rule}`,
          }}>
            <span>Neighborhood Niche © 2026</span>
            <span style={{
              position: 'absolute', left: '50%', transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
            }}>
              Emmett Cohen & Eli Edmonds · Friends Seminary
            </span>
            <a
              href="https://github.com/eliedmonds13/neighborhood-niche"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: T.inkLight, textDecoration: 'none',
                borderBottom: `1px solid ${T.inkLight}`, paddingBottom: 1,
                transition: 'color 0.2s, border-color 0.2s',
              }}
            >
              GitHub Repository ↗
            </a>
          </footer>
        </div>
      )}

      {/* ══════════════ MAP PAGE ══════════════ */}
      {page === 'map' && (
        <div className="anim-page" style={{
          height: '100vh', display: 'flex', flexDirection: 'column',
          paddingTop: sm ? 78 : 90,
        }}>
          <div style={{
            padding: sm ? '12px 20px' : '14px 40px',
            borderBottom: `1px solid ${T.rule}`,
            display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap',
          }}>
            <span style={{ fontFamily: T.fontDisplay, fontSize: '1.05rem', fontWeight: 400 }}>
              The Map
            </span>
            <span style={{
              fontSize: '0.62rem', letterSpacing: '0.12em',
              textTransform: 'uppercase', color: T.inkLight,
            }}>
              Union Square & East Village · Independent businesses only
            </span>
          </div>
          <div style={{ flex: 1 }}>
            <FoodMap openSpotId={openSpotId} />
          </div>
        </div>
      )}
    </>
  );
}