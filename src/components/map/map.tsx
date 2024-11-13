import { useRef, useEffect } from 'react';
import { Icon, Marker, LayerGroup } from 'leaflet';
import useMap from '../../hooks/useMap';
import type { Offer } from '../../types/types';
import 'leaflet/dist/leaflet.css';
import { useAppSelector } from '../../hooks';
import { cities } from '../../const';

type MapProps = {
  offers: Offer[];
  selectedOffer?: Offer;
  blockClass: string;
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

function Map({offers, selectedOffer, blockClass}: MapProps): JSX.Element {
  const currentCity = useAppSelector((state) => state.city);
  const city = cities[currentCity];
  const mapRef = useRef<HTMLElement | null>(null);
  const map = useMap(mapRef, city);


  const markersLayer = useRef(new LayerGroup());
  useEffect(() => {
    if (map) {
      markersLayer.current.clearLayers();
      if (!map.hasLayer(markersLayer.current)) {
        markersLayer.current.addTo(map);
      }

      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });
        marker
          .setIcon(selectedOffer !== undefined && selectedOffer.id === offer.id ? currentCustomIcon : defaultCustomIcon)
          .addTo(markersLayer.current);
      });

      if (blockClass === 'property__map' && selectedOffer) {
        const marker = new Marker({
          lat: selectedOffer.location.latitude,
          lng: selectedOffer.location.longitude
        });
        marker
          .setIcon(currentCustomIcon )
          .addTo(markersLayer.current);
      }
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
    }
  }, [map, offers, selectedOffer, blockClass, city]);

  return (
    <section className={`map ${blockClass}`} style={{maxWidth: '1144px', margin: '0 auto 50px auto'}} ref={mapRef}/>
  );
}

export default Map;
