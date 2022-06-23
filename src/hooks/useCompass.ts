import getDistance from 'geolib/es/getDistance';
import getRhumbLineBearing from 'geolib/es/getRhumbLineBearing';
import { useCallback, useEffect, useState } from 'react';

const useCompass = (stationCoords: {
  latitude: number;
  longitude: number;
}): {
  currentHeading: number | null;
  stationHeading: number;
  distance: number;
  positionError: GeolocationPositionError | undefined;
} => {
  const [currentHeading, setCurrentHeading] = useState<number | null>(null);
  const [distance, setDistance] = useState<number>(0);
  const [stationHeading, setStationHeading] = useState<number>(0);
  const [positionError, setPositionError] =
    useState<GeolocationPositionError>();

  const handlePositionChange = useCallback(
    (position: GeolocationPosition): void => {
      setCurrentHeading(position.coords.heading);
      setDistance(
        getDistance(stationCoords, {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      );
      setStationHeading(
        getRhumbLineBearing(stationCoords, {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      );
    },
    [stationCoords]
  );

  useEffect(() => {
    const id = navigator.geolocation.watchPosition(
      handlePositionChange,
      setPositionError,
      {
        maximumAge: 0,
      }
    );
    return (): void => {
      navigator.geolocation.clearWatch(id);
    };
  }, [handlePositionChange]);

  return { currentHeading, stationHeading, distance, positionError };
};

export default useCompass;
