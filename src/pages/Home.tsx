import React, { useCallback, useEffect, useState } from 'react';
import ErrorScreen from '../components/ErrorScreen';
import Loading from '../components/Loading';
import PageCommon from '../components/PageCommon';
import useClosestStation from '../hooks/useClosestStation';
import useFlickrPhoto from '../hooks/useFlickrImage';

const StationPage: React.FC = () => {
  const [geolocationUnavailable, setGeolocationUnavailable] = useState(false);
  const [coordinates, setCoordinates] = useState<GeolocationCoordinates | null>(
    null
  );
  const [fetchStationFunc, station, loading, fetchError] = useClosestStation();

  const fetchCurrentPosition = useCallback(() => {
    if (!navigator.geolocation) {
      return setGeolocationUnavailable(true);
    }
    setCoordinates(null);
    navigator.geolocation.getCurrentPosition(
      (pos: GeolocationPosition) => setCoordinates(pos.coords),
      (err: GeolocationPositionError) => {
        console.error(err);
        setGeolocationUnavailable(true);
      },
      {
        maximumAge: 0,
        timeout: 5000,
      }
    );
  }, []);

  useEffect(() => {
    fetchCurrentPosition();
  }, [fetchCurrentPosition]);

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

  if (loading || !station) {
    return <Loading usingLocation />;
  }

  if (geolocationUnavailable) {
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
