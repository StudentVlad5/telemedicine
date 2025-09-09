import React, { useRef, useEffect } from "react";
import { YMaps, Map } from "@pbe/react-yandex-maps";
import s from "./index.module.scss";

type Props = {
  longitude:  number,
  latitude:  number,
  setLatitude: (lat: string) => void;
  setLongitude: (lng: string) => void;
  setPauseFetchCoordinate: (value: boolean) => void;
};

const MapSelector: React.FC<Props> = ({
  latitude,
  longitude,
  setLatitude,
  setLongitude,
  setPauseFetchCoordinate,
}) => {

  const mapRef = useRef<ymaps.Map | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialCenter: [number, number] = [latitude, longitude];

  useEffect(() => {
    const lat = Number(latitude);
    const lng = Number(longitude);
    if (
      !isNaN(lat) &&
      !isNaN(lng) &&
      mapRef.current &&
      JSON.stringify(mapRef.current.getCenter()) !== JSON.stringify([lat, lng])
    ) {
      mapRef.current.setCenter([lat, lng], mapRef.current.getZoom(), {
        duration: 300,
      });
    }
  }, [latitude, longitude]);
  
   useEffect(() => {
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current?.container.fitToViewport();
      }, 100);
    }
  }, []);

  const handleBoundsChange = () => {
    if (mapRef.current) {
      const newCenter = mapRef.current.getCenter() as [number, number];
      setLatitude(newCenter[0].toString());
      setLongitude(newCenter[1].toString());

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setPauseFetchCoordinate(true);
      }, 4000);
      
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <YMaps query={{ apikey: "762777a6-9dcb-47bb-a968-4ed70e184942", lang: "ru_RU" }}>
      <div className={s.mapContainer}>
        <Map
          defaultState={{ center: initialCenter, zoom: 14 }}
          width="100%"
          height="100%"
          instanceRef={(ref) => (mapRef.current = ref)}
          onBoundsChange={handleBoundsChange}
        />
        <div className={s.iconPosition}>
          <img src="/person-svgrepo-com.svg" alt="center icon" width={96} height={96} />
        </div>
      </div>
    </YMaps>
  );
};

export default MapSelector;

