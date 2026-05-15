import { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';
import { myFavoriteSpots, FoodSpot } from '../data/spots';
import friendsLogo from '../assets/FSLogo.png';

const MAP_STYLES = [
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.business', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit.station', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
];

function SchoolCard({ spot }: { spot: FoodSpot }) {
  return (
    <div style={{ fontFamily: "'Georgia', serif", padding: '4px 6px' }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: '1rem' }}>{spot.name}</p>
      <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#777', fontFamily: 'monospace' }}>{spot.address}</p>
    </div>
  );
}

function SpotCard({ spot }: { spot: FoodSpot }) {
  return (
    <div style={{ width: 300, fontFamily: "'Georgia', serif", color: '#1a1a1a' }}>
      <div style={{ marginBottom: 8 }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>{spot.emoji} {spot.name}</h3>
        {spot.address && (
          <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#777', fontFamily: 'monospace' }}>
            {spot.address}
          </p>
        )}
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #e0dbd3', margin: '8px 0' }} />

      <p style={{ margin: '0 0 4px', fontSize: '0.65rem', fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#999' }}>
        Our recommendation
      </p>
      <p style={{ margin: '0 0 10px', fontSize: '0.85rem', fontWeight: 600 }}>{spot.recommendation}</p>

      <hr style={{ border: 'none', borderTop: '1px solid #e0dbd3', margin: '8px 0' }} />

      <p style={{ margin: '0 0 4px', fontSize: '0.65rem', fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#999' }}>
        Description
      </p>
      <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: 1.5, color: '#333' }}>{spot.reason}</p>

      {spot.videoUrl && (
        <div style={{ marginTop: 12, borderRadius: 4, overflow: 'hidden' }}>
          <iframe
            src={spot.videoUrl}
            title={`${spot.name} — owner interview`}
            width="100%"
            height="150"
            style={{ display: 'block', border: 'none' }}
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}

interface FoodMapProps {
  openSpotId?: string | null;
}

export const FoodMap = ({ openSpotId }: FoodMapProps) => {
  const [selectedSpot, setSelectedSpot] = useState<FoodSpot | null>(null);

  useEffect(() => {
    if (openSpotId) {
      const spot = myFavoriteSpots.find(s => s.id === openSpotId) ?? null;
      setSelectedSpot(spot);
    }
  }, [openSpotId]);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: '100%', width: '100%' }}>
        <Map
          defaultCenter={{ lat: 40.734055572969844, lng: -73.9850736125582 }}
          defaultZoom={15}
          mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
          options={{ styles: MAP_STYLES }}
        >
          {myFavoriteSpots.map((spot) => (
            <AdvancedMarker
              key={spot.id}
              position={spot.position}
              onClick={() => setSelectedSpot(spot)}
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
                <div style={{ fontSize: '2rem', cursor: 'pointer' }}>{spot.emoji}</div>
              )}
            </AdvancedMarker>
          ))}

          {selectedSpot && (
            <InfoWindow
              position={selectedSpot.position}
              onCloseClick={() => setSelectedSpot(null)}
            >
              {selectedSpot.id === 'school'
                ? <SchoolCard spot={selectedSpot} />
                : <SpotCard spot={selectedSpot} />
              }
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
};