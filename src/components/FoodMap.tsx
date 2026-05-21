import { useState, useEffect, useRef } from 'react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { myFavoriteSpots, FoodSpot } from '../data/spots';
import friendsLogo from '../assets/FSLogo.png';

function useWindowWidth() {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => {
    const handler = () => setW(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return w;
}

const MAP_STYLES = [
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.business', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit.station', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
];

const T = {
  cream: '#f5f0e8',
  ink: '#1a1a1a',
  inkLight: '#4a4540',
  rule: '#d4cec4',
  accent: '#c9472b',
  fontDisplay: "'Playfair Display', serif",
  fontMono: "'DM Mono', monospace",
};

const PANEL_CSS = `
  /* Desktop Animations (Slide left/right) */
  @keyframes panelIn  { from { transform: translateX(100%); } to { transform: translateX(0); } }
  @keyframes panelOut { from { transform: translateX(0); }   to { transform: translateX(100%); } }
  
  /* Mobile Animations (Slide up/down from bottom) */
  @keyframes panelUpIn  { from { transform: translateY(100%); } to { transform: translateY(0); } }
  @keyframes panelUpOut { from { transform: translateY(0); }   to { transform: translateY(100%); } }

  @keyframes contentOut {
    from { opacity: 1; transform: translateY(0); }
    to   { opacity: 0; transform: translateY(8px); }
  }
  @keyframes contentIn {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes photoFade {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .panel-slide-in  { animation: panelIn  0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .panel-slide-out { animation: panelOut 0.3s cubic-bezier(0.4, 0, 1, 1) forwards; }
  
  .panel-up-in     { animation: panelUpIn 0.38s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .panel-up-out    { animation: panelUpOut 0.32s cubic-bezier(0.4, 0, 1, 1) forwards; }

  .scroll-container {
    overscroll-behavior-y: contain;
    -webkit-overflow-scrolling: touch;
  }

  .content-out { animation: contentOut 0.13s ease forwards; }
  .content-in  { animation: contentIn  0.18s ease forwards; }
  .photo-fade  { animation: photoFade 0.25s ease forwards; }

  .arrow-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255,255,255,0.85);
    border: none;
    cursor: pointer;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    color: #1a1a1a;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    transition: background 0.15s;
    z-index: 2;
  }
  .arrow-btn:hover { background: rgba(255,255,255,1); }
  .arrow-btn.left  { left: 8px; }
  .arrow-btn.right { right: 8px; }
`;

function PhotoCarousel({ photos }: { photos: string[] }) {
  const [idx, setIdx] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);

  useEffect(() => {
    setIdx(0);
    setFadeKey(0);
  }, [photos]);

  if (!photos || photos.length === 0) return null;

  const go = (dir: number) => {
    setIdx(i => (i + dir + photos.length) % photos.length);
    setFadeKey(k => k + 1);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '260px', background: '#e8e4dc', overflow: 'hidden' }}>
      <img
        key={fadeKey}
        src={photos[idx]}
        alt={`Photo ${idx + 1}`}
        className="photo-fade"
        style={{ width: 'auto', height: '100%', maxWidth: '100%', maxHeight: '260px', objectFit: 'contain', display: 'block', margin: '0 auto' }}
      />

      {photos.length > 1 && (
        <>
          <button className="arrow-btn left" onClick={() => go(-1)}>‹</button>
          <button className="arrow-btn right" onClick={() => go(1)}>›</button>

          <div style={{
            position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', gap: 5,
          }}>
            {photos.map((_, i) => (
              <div
                key={i}
                onClick={() => { setIdx(i); setFadeKey(k => k + 1); }}
                style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: i === idx ? 'white' : 'rgba(255,255,255,0.45)',
                  cursor: 'pointer', transition: 'background 0.2s',
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ExpandableText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const LIMIT = 320;
  const stripped = text.replace(/<[^>]*>/g, '');
  const isLong = stripped.length > LIMIT;
  const truncated = stripped.slice(0, LIMIT).trimEnd() + '…';

  return (
    <div style={{ fontSize: '0.85rem', lineHeight: 1.7, color: '#4a4540' }}>
      <span dangerouslySetInnerHTML={{ __html: expanded ? text : truncated }} />
      {isLong && (
        <button
          onClick={() => setExpanded(e => !e)}
          style={{
            display: 'block', marginTop: 8, background: 'none', border: 'none',
            cursor: 'pointer', fontSize: '0.65rem', fontFamily: "'DM Mono', monospace",
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#c9472b', padding: 0,
          }}
        >
          {expanded ? 'Read less ↑' : 'Read more ↓'}
        </button>
      )}
    </div>
  );
}

function SpotPanel({
  spot,
  isClosing,
  swapPhase,
  onClose,
  isMobile
}: {
  spot: FoodSpot;
  isClosing: boolean;
  swapPhase: 'out' | 'in' | null;
  onClose: () => void;
  isMobile: boolean;
}) {
  const isSchool = spot.id === 'school';
  const contentClass = swapPhase === 'out' ? 'content-out' : swapPhase === 'in' ? 'content-in' : '';

  const panelAnim = isMobile 
    ? (isClosing ? 'panel-up-out' : 'panel-up-in') 
    : (isClosing ? 'panel-slide-out' : 'panel-slide-in');

  return (
    <div className={`${panelAnim} scroll-container`} style={{
      position: 'absolute',
      top: isMobile ? 'auto' : 0,
      bottom: 0,
      left: isMobile ? 0 : 'auto',
      right: 0,
      width: isMobile ? '100%' : 340,
      // Bumps height up significantly on mobile so videos/carousels fit comfortably
      maxHeight: isMobile ? '75dvh' : '100%',
      background: T.cream,
      borderLeft: isMobile ? 'none' : `1px solid ${T.rule}`,
      borderTop: isMobile ? `1px solid ${T.rule}` : 'none',
      // Sweeter, deeper rounded corners on mobile look like native UI sheets
      borderTopLeftRadius: isMobile ? '20px' : '0',
      borderTopRightRadius: isMobile ? '20px' : '0',
      boxShadow: isMobile ? '0 -8px 32px rgba(0,0,0,0.15)' : 'none',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 10,
      overflowY: 'auto',
    }}>
      {/* Native-style Grab Handle Accent for mobile sheets */}
      {isMobile && (
        <div style={{
          width: '40px',
          height: '4px',
          background: T.rule,
          borderRadius: '2px',
          margin: '10px auto 2px',
          flexShrink: 0
        }} />
      )}

      {/* Sticky header */}
      <div className={contentClass} style={{
        padding: isMobile ? '12px 20px 14px' : '18px 18px 14px',
        borderBottom: `1px solid ${T.rule}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        background: T.cream,
        zIndex: 1,
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{
            fontFamily: T.fontDisplay,
            fontSize: isMobile ? '1.35rem' : '1.2rem', // Slightly scaled up title on mobile
            fontWeight: 400,
            margin: 0,
            lineHeight: 1.2,
          }}>
            {!isSchool && <span style={{ marginRight: 6 }}>{spot.emoji}</span>}
            {spot.name}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 5, flexWrap: 'wrap' }}>
            {spot.address && (
              <p style={{ margin: 0, fontSize: '0.72rem', color: '#888', fontFamily: T.fontMono }}>
                {spot.address}
              </p>
            )}
            {spot.priceRange && (
              <span style={{
                fontSize: '0.68rem', fontFamily: T.fontMono,
                fontWeight: 700,
                color: '#2d7a3a', background: 'rgba(45,122,58,0.1)',
                padding: '3px 9px', borderRadius: 20,
                whiteSpace: 'nowrap',
              }}>
                {spot.priceRange}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '1.2rem', color: T.inkLight, padding: '0 4px 0 12px',
            lineHeight: 1, flexShrink: 0, marginTop: 2,
          }}
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className={contentClass}>
        {isSchool ? (
          <div style={{ padding: '20px' }}>
            <p style={{ fontSize: '0.81rem', lineHeight: 1.7, color: T.inkLight }}>
              Friends Seminary is a K–12 Quaker school located in Gramercy, Manhattan.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>

            {/* Recommendation */}
            <div style={{ padding: '16px 18px' }}>
              <p style={{
                fontSize: '0.6rem', fontFamily: T.fontMono, fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase', color: '#aaa',
                marginBottom: 5,
              }}>Our recommendation</p>
              <p style={{ fontSize: '0.95rem', fontWeight: 600, color: T.ink, margin: 0 }}>
                {spot.recommendation}
              </p>
            </div>

            <hr style={{ border: 'none', borderTop: `1px solid ${T.rule}`, margin: 0 }} />

            {/* Description */}
            <div style={{ padding: '16px 18px' }}>
              <p style={{
                fontSize: '0.6rem', fontFamily: T.fontMono, fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase', color: '#aaa',
                marginBottom: 5,
              }}>Description</p>
              <ExpandableText text={spot.reason} />
            </div>

            {/* Photo carousel */}
            {spot.photos && spot.photos.length > 0 && (
              <>
                <hr style={{ border: 'none', borderTop: `1px solid ${T.rule}`, margin: 0 }} />
                <div style={{ padding: '16px 18px' }}>
                  <p style={{
                    fontSize: '0.6rem', fontFamily: T.fontMono, fontWeight: 700,
                    letterSpacing: '0.12em', textTransform: 'uppercase', color: '#aaa',
                    marginBottom: 10,
                  }}>Photos</p>
                  <div style={{ borderRadius: 4, overflow: 'hidden' }}>
                    <PhotoCarousel photos={spot.photos} />
                  </div>
                </div>
              </>
            )}

            {/* Video */}
            {spot.videoUrl && (
              <>
                <hr style={{ border: 'none', borderTop: `1px solid ${T.rule}`, margin: 0 }} />
                <div style={{ padding: '16px 18px 24px' }}>
                  <p style={{
                    fontSize: '0.6rem', fontFamily: T.fontMono, fontWeight: 700,
                    letterSpacing: '0.12em', textTransform: 'uppercase', color: '#aaa',
                    marginBottom: 10,
                  }}>Video</p>
                  <div style={{ borderRadius: 4, overflow: 'hidden', aspectRatio: '16/9' }}>
                    <iframe
                      src={spot.videoUrl}
                      title={`${spot.name} — video`}
                      width="100%"
                      height="100%"
                      style={{ display: 'block', border: 'none' }}
                      allowFullScreen
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

interface FoodMapProps {
  openSpotId?: string | null;
}

export const FoodMap = ({ openSpotId }: FoodMapProps) => {
  const [displayedSpot, setDisplayedSpot] = useState<FoodSpot | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [swapPhase, setSwapPhase] = useState<'out' | 'in' | null>(null);
  
  const closingRef = useRef(false);
  const pendingSpotRef = useRef<FoodSpot | null>(null);

  const w = useWindowWidth();
  const isMobile = w < 640;

  useEffect(() => {
    if (openSpotId) {
      const spot = myFavoriteSpots.find(s => s.id === openSpotId) ?? null;
      if (spot) openSpot(spot);
    }
  }, [openSpotId]);

  const openSpot = (spot: FoodSpot) => {
    if (closingRef.current) return;

    if (displayedSpot) {
      pendingSpotRef.current = spot;
      setSwapPhase('out');
      setTimeout(() => {
        setDisplayedSpot(pendingSpotRef.current);
        setSwapPhase('in');
        setTimeout(() => setSwapPhase(null), 180);
      }, 130);
    } else {
      setDisplayedSpot(spot);
      setIsClosing(false);
      setSwapPhase(null);
    }
  };

  const closePanel = () => {
    if (closingRef.current) return;
    closingRef.current = true;
    setIsClosing(true);
    setTimeout(() => {
      setDisplayedSpot(null);
      setSwapPhase(null);
      closingRef.current = false;
      setIsClosing(false);
    }, 320); // Matched closely with animation length
  };

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <style>{PANEL_CSS}</style>
      <div style={{ height: '100%', width: '100%', position: 'relative', overflow: 'hidden' }}>
        <Map
          defaultCenter={{ lat: 40.734055572969844, lng: -73.9850736125582 }}
          defaultZoom={15}
          mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
          options={{
            styles: MAP_STYLES,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            zoomControl: false,
            disableDefaultUI: true,
          }}
          onClick={() => { if (displayedSpot) closePanel(); }}
        >
          {myFavoriteSpots.map((spot) => (
            <AdvancedMarker
              key={spot.id}
              position={spot.position}
              onClick={(e) => { e.stop(); openSpot(spot); }}
            >
              {spot.id === 'school' ? (
                <img
                  src={friendsLogo}
                  alt="Friends Seminary"
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    objectFit: 'cover', cursor: 'pointer',
                    border: '2px solid white',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                  }}
                />
              ) : spot.iconUrl ? (
                <img
                  src={spot.iconUrl}
                  alt={spot.name}
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    objectFit: 'cover', cursor: 'pointer',
                    border: '2px solid white',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                  }}
                />
              ) : (
                <div style={{ fontSize: '2rem', cursor: 'pointer', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
                  {spot.emoji}
                </div>
              )}
            </AdvancedMarker>
          ))}
        </Map>

        {displayedSpot && (
          <SpotPanel
            spot={displayedSpot}
            isClosing={isClosing}
            swapPhase={swapPhase}
            onClose={closePanel}
            isMobile={isMobile}
          />
        )}
      </div>
    </APIProvider>
  );
};