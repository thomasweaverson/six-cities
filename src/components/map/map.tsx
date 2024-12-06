import { useRef, useEffect } from 'react';
import { Icon, Marker, LayerGroup } from 'leaflet';

import type { City, Offer } from '../../types/types';

import useMap from '../../hooks/use-map';

import 'leaflet/dist/leaflet.css';
import { useAppSelector } from '../../hooks';

type MapProps = {
  city: City;
  offers: Offer[];
  blockClass?: string;
}

const defaultCustomIcon = new Icon({
  iconUrl: '../img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

const currentCustomIcon = new Icon({
  iconUrl: '../img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

function Map({city, offers, blockClass = 'cities__map'}: MapProps): JSX.Element {
  const mapRef = useRef<HTMLElement | null>(null);
  const map = useMap(mapRef, city);

  const activeOffer = useAppSelector((state) => state.activeOffer);

  useEffect(() => {
    if (map) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
    }
  }, [map, city]);

  useEffect(() => {
    if (!map) {
      return;
    }

    const markersLayer = new LayerGroup();

    offers.forEach((offer) => {
      const marker = new Marker({
        lat: offer.location.latitude,
        lng: offer.location.longitude
      });

      marker
        .setIcon(offer.id === activeOffer?.id ? currentCustomIcon : defaultCustomIcon)
        .addTo(markersLayer);
    });
    markersLayer.addTo(map);

    return () => {
      markersLayer.clearLayers();
      map.removeLayer(markersLayer);
    };
  }, [map, offers, activeOffer]);

  return (
    <section className={`map ${blockClass}`} style={{maxWidth: '1144px', margin: '0 auto 50px auto'}} ref={mapRef}/>
  );
}

export default Map;
