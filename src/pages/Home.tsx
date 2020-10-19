import React, { memo, useCallback, useEffect, useState } from 'react';
import Loading from '../components/Loading';
import ErrorScreen from '../components/ErrorScreen';
import useFlickrPhoto from '../hooks/useFlickrImage';
import useClosestStation from '../hooks/useClosestStation';
import PageCommon from '../components/PageCommon';

const StationPage: React.FC = () => {
  const [geolocationUnavailable, setGeolocationUnavailable] = useState(false);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [fetchStationFunc, station, loading, fetchError] = useClosestStation();

  const getCurrentPositionSuccess = useCallback((pos: Position) => {
    setCoordinates(pos.coords);
  }, []);

  const getCurrentPositionFailed = useCallback((err: PositionError) => {
    console.error(err);
    setGeolocationUnavailable(true);
  }, []);

  const fetchCurrentPosition = useCallback(() => {
    if (!navigator.geolocation) {
      return setGeolocationUnavailable(true);
    }
    setCoordinates(null);
    navigator.geolocation.getCurrentPosition(
      getCurrentPositionSuccess,
      getCurrentPositionFailed,
      {
        enableHighAccuracy: true,
        maximumAge: 0,
      }
    );
  }, [getCurrentPositionFailed, getCurrentPositionSuccess]);

  useEffect(() => {
    fetchCurrentPosition();
  }, [fetchCurrentPosition]);

  const [flickrFetchFunc, flickrPhoto] = useFlickrPhoto();

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

  const handleRefresh = useCallback(() => {
    fetchCurrentPosition();
    if (coordinates) {
      const { latitude, longitude } = coordinates;
      fetchStationFunc(latitude, longitude);
    }
  }, [coordinates, fetchCurrentPosition, fetchStationFunc]);

  if (loading || !station) {
    return <Loading />;
  }

  if (geolocationUnavailable) {
    return (
      <ErrorScreen error="位置情報を利用できないため、当アプリを使用することができません。" />
    );
  }

  if (fetchError) {
    return <ErrorScreen error="駅情報の取得に失敗しました。" />;
  }

  return (
    <PageCommon
      onRefresh={handleRefresh}
      photoUrl={flickrPhoto}
      station={station}
    />
  );
};

export default memo(StationPage);
