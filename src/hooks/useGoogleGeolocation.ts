import { useCallback, useState } from 'react';

type GoogleGeolocationLocation = {
  lat: number;
  lng: number;
};

type GoogleGeolocationResponse = {
  location: GoogleGeolocationLocation;
  accuracy: number;
};

const accessToken = process.env.REACT_APP_GMAP_ACCESS_TOKEN;

const useGoogleGeolocation = (): {
  position: GoogleGeolocationResponse | null;
  loading: boolean;
  error: Error | null;
  fetchLocation: () => Promise<void>;
} => {
  const [position, setPosition] = useState<GoogleGeolocationResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchLocation = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.googleapis.com/geolocation/v1/geolocate?key=${accessToken}`,
        {
          method: 'post',
        }
      );
      setPosition(await res.json());
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    position,
    loading,
    error,
    fetchLocation,
  };
};

export default useGoogleGeolocation;
