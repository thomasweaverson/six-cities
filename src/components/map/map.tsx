import { useRef, useEffect } from 'react';
import { Icon, Marker } from 'leaflet';
import useMap from '../../hooks/useMap';
import { City, Offer } from '../../types/types';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  offers: Offer[];
  selectedOffer: Offer | undefined;
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

function Map({city, offers, selectedOffer}: MapProps): JSX.Element {
  const mapRef = useRef<HTMLElement | null>(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });
        marker
          .setIcon(selectedOffer !== undefined && selectedOffer.id === offer.id ? currentCustomIcon : defaultCustomIcon)
          .addTo(map);
      });
    }
  }, [map, offers, selectedOffer]);

  return (
    <section className="cities__map map" style={{height: '100%'}} ref={mapRef}/>
  );
}

export default Map;
