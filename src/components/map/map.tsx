import { useRef, useEffect } from 'react';
import { Icon, Marker, LayerGroup } from 'leaflet';

import type { City, GeoLocation } from '../../types/types';

import useMap from '../../hooks/useMap';

// import { CityLocation } from '../../const';

import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  locations: GeoLocation[];
  blockClass?: string;
}

const defaultCustomIcon = new Icon({
  iconUrl: '../img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

// const currentCustomIcon = new Icon({
//   iconUrl: '../img/pin-active.svg',
//   iconSize: [27, 39],
//   iconAnchor: [13.5, 39]
// });

function Map({city, locations, blockClass = 'cities__map'}: MapProps): JSX.Element {
  const mapRef = useRef<HTMLElement | null>(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    const markersLayer = new LayerGroup();
    if (map) {
      if (!map.hasLayer(markersLayer)) {
        markersLayer.addTo(map);
      }

      locations.forEach((location) => {
        const marker = new Marker({
          lat: location.latitude,
          lng: location.longitude
        });
        marker
          .setIcon(defaultCustomIcon)
          .addTo(markersLayer);
      });

      // if (blockClass === 'property__map' && selectedOffer) {
      //   const marker = new Marker({
      //     lat: selectedOffer.location.latitude,
      //     lng: selectedOffer.location.longitude
      //   });
      //   marker
      //     .setIcon(currentCustomIcon )
      //     .addTo(markersLayer.current);
      // }
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
    }

    return () => {
      if (map) {
        map.removeLayer(markersLayer);
      }
    };
  }, [map, locations, city]);

  return (
    <section className={`map ${blockClass}`} style={{maxWidth: '1144px', margin: '0 auto 50px auto'}} ref={mapRef}/>
  );
}

export default Map;
