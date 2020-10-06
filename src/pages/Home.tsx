import React, { memo, useCallback, useEffect, useState } from 'react';
import Loading from '../components/Loading';
import ErrorScreen from '../components/ErrorScreen';
import useFlickrPhoto from '../hooks/useFlickrImage';
import useClosestStation from '../hooks/useClosestStation';
import PageCommon from '../components/PageCommon';

const StationPage: React.FC = () => {
  const [geolocationUnavailable, setGeolocationUnavailable] = useState(false);
  const [coordinates, setCoordinates] = useState<Coordinates>();
  const [fetchStationFunc, station, loading, fetchError] = useClosestStation();

  const getCurrentPositionSuccess = useCallback((pos: Position) => {
    setCoordinates(pos.coords);
  }, []);

  const getCurrentPositionFailed = useCallback((err: PositionError) => {
    console.error(err);
    setGeolocationUnavailable(true);
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      return setGeolocationUnavailable(true);
    }
    navigator.geolocation.getCurrentPosition(
      getCurrentPositionSuccess,
      getCurrentPositionFailed
    );
  }, [
    setGeolocationUnavailable,
    getCurrentPositionFailed,
    getCurrentPositionSuccess,
  ]);

  const [flickrFetchFunc, flickrPhoto] = useFlickrPhoto();

  useEffect(() => {
    if (station) {
      flickrFetchFunc(station);
    }
  }, [station, flickrFetchFunc]);

  if (coordinates) {
    const { latitude, longitude } = coordinates;
    fetchStationFunc(latitude, longitude);
  }

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

  return <PageCommon photoUrl={flickrPhoto} station={station} />;
};

export default memo(StationPage);
