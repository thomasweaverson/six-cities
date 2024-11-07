import { useRef, useEffect } from 'react';
import { Icon, Marker } from 'leaflet';
import useMap from '../../hooks/useMap';
import { City, Offer } from '../../types/types';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
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

function Map({city, offers, selectedOffer, blockClass}: MapProps): JSX.Element {
  const mapRef = useRef<HTMLElement | null>(null);
  const map = useMap(mapRef, city);
  // eslint-disable-next-line no-console
  console.log('selectedOffer', selectedOffer);
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

      if (blockClass === 'property__map' && selectedOffer) {
        const marker = new Marker({
          lat: selectedOffer.location.latitude,
          lng: selectedOffer.location.longitude
        });
        marker
          .setIcon(currentCustomIcon )
          .addTo(map);
      }
    }
  }, [map, offers, selectedOffer, blockClass]);

  return (
    <section className={`map ${blockClass}`} style={{maxWidth: '1144px', margin: '0 auto 50px auto'}} ref={mapRef}/>
  );
}

export default Map;
