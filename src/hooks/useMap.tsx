import { useEffect, useState, MutableRefObject, useRef } from 'react';
import { Map, TileLayer } from 'leaflet';
import { City } from '../types/types';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: City
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isMapInitialized = useRef<boolean>(false);

  useEffect(() => {
    if (!isMapInitialized.current && mapRef.current !== null) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
      });

      const layer = new TileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }
      );

      instance.addLayer(layer);

      setMap(instance);
      isMapInitialized.current = true;
    }
    //@thws vVv этого не было в разборе
    return () => {
      if (map) {
        map.remove();
        setMap(null);
        isMapInitialized.current = false;
      }
    };
  }, [mapRef, city, map]);

  return map;
}

export default useMap;
