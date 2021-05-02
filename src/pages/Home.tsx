import React, { useCallback, useEffect, useState } from 'react';
import Loading from '../components/Loading';
import ErrorScreen from '../components/ErrorScreen';
import useFlickrPhoto from '../hooks/useFlickrImage';
import useClosestStation from '../hooks/useClosestStation';
import PageCommon from '../components/PageCommon';
import useGoogleGeolocation from '../hooks/useGoogleGeolocation';

const StationPage: React.FC = () => {
  const [geolocationUnavailable, setGeolocationUnavailable] = useState(false);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [fetchStationFunc, station, loading, fetchError] = useClosestStation();
  const {
    fetchLocation: googleGeolocationFetch,
    position: googleGeolocationPosition,
    loading: googleGeolocationLoading,
    error: googleGeolocationError,
  } = useGoogleGeolocation();

  const fetchCurrentPosition = useCallback(() => {
    if (!navigator.geolocation) {
      return setGeolocationUnavailable(true);
    }
    setCoordinates(null);
    navigator.geolocation.getCurrentPosition(
      (pos: Position) => setCoordinates(pos.coords),
      (err: PositionError) => {
        console.error(err);
        setGeolocationUnavailable(true);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );
  }, []);

  useEffect(() => {
    fetchCurrentPosition();
  }, [fetchCurrentPosition]);

  useEffect(() => {
    if (geolocationUnavailable) {
      googleGeolocationFetch();
    }
  }, [geolocationUnavailable, googleGeolocationFetch]);

  useEffect(() => {
    if (googleGeolocationPosition) {
      setCoordinates({
        latitude: googleGeolocationPosition.location.lat,
        longitude: googleGeolocationPosition.location.lng,
        accuracy: googleGeolocationPosition.accuracy,
        altitude: 0,
        altitudeAccuracy: 0,
        heading: 0,
        speed: 0,
      });
    }
  }, [googleGeolocationPosition]);

  const [flickrFetchFunc, flickrPhoto, photoLoading] = useFlickrPhoto();

  useEffect(() => {
    if (station) {
      flickrFetchFunc(station);
    }
  }, [station, flickrFetchFunc]);

  useEffect(() => {
    if (coordinates) {
      const { latitude, longitude } = coordinates;
      fetchStationFunc(latitude, longitude);
    }
  }, [coordinates, fetchStationFunc]);

  const handleRefresh = (): void => {
    fetchCurrentPosition();
    if (coordinates) {
      const { latitude, longitude } = coordinates;
      fetchStationFunc(latitude, longitude);
    }
  };

  if (loading || !station || googleGeolocationLoading) {
    return <Loading usingLocation />;
  }

  if (googleGeolocationError) {
    return (
      <ErrorScreen
        onRetry={handleRefresh}
        error="位置情報を利用できないため、当アプリを使用することができません。"
      />
    );
  }

  if (fetchError) {
    return (
      <ErrorScreen
        onRetry={handleRefresh}
        error="駅情報の取得に失敗しました。"
      />
    );
  }

  return (
    <PageCommon
      onRefresh={handleRefresh}
      photoUrl={flickrPhoto}
      photoLoading={photoLoading}
      station={station}
      poorAccuracy={geolocationUnavailable}
    />
  );
};

export default StationPage;
