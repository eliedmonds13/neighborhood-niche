import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';
import { myFavoriteSpots, FoodSpot } from '../data/spots';

export const FoodMap = () => {

  const mapOptions = {
  styles: [
    { featureType: 'poi', stylers: [{ visibility: 'off' }] }, // all points of interest
    { featureType: 'poi.business', stylers: [{ visibility: 'off' }] }, // businesses
    { featureType: 'transit', stylers: [{ visibility: 'off' }] }, // transit features
    { featureType: 'transit.station', stylers: [{ visibility: 'off' }] }, // stations (subway, train)
    { featureType: 'road', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] } // road icons
  ]
  };
  const [selectedSpot, setSelectedSpot] = useState<FoodSpot | null>(null);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: '100vh', width: '100%' }}>
        <Map
          defaultCenter={{ lat: 40.731, lng: -73.998 }}
          defaultZoom={15}
          mapId="5ce8220699891c25a3e99422" // Custom map ID - NeighborhoodNicheStyle1
          options={mapOptions}
        >
          {myFavoriteSpots.map((spot) => (
            <AdvancedMarker
              key={spot.id}
              position={spot.position}
              onClick={() => setSelectedSpot(spot)}
            >
              <div style={{ fontSize: '2rem', cursor: 'pointer' }}>
                {spot.emoji}
              </div>
            </AdvancedMarker>
          ))}

          {selectedSpot && (
            <InfoWindow
              position={selectedSpot.position}
              onCloseClick={() => setSelectedSpot(null)}
            >
              <div style={{ maxWidth: '300px', color: '#333' }}>
                <h3 style={{ margin: '0 0 5px 0' }}>{selectedSpot.name}</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '10px' }}>{selectedSpot.reason}</p>
                <iframe
                  width="100%"
                  height="150"
                  src={selectedSpot.videoUrl}
                  title="Owner Interview"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
};