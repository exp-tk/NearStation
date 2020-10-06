import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import styles from './Home.module.css';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet';
import Loading from '../components/Loading';
import ErrorScreen from '../components/ErrorScreen';
import useFlickrPhoto from '../hooks/useFlickrImage';
import useClosestStation from '../hooks/useClosestStation';
import LinesModal from '../components/LinesModal';

const StationPage: React.FC = () => {
  const [geolocationUnavailable, setGeolocationUnavailable] = useState(false);
  const [coordinates, setCoordinates] = useState<Coordinates>();
  const [isLinesModalShow, setIsLinesModalShow] = useState(false);

  const getCurrentPositionSuccess = useCallback((pos: Position) => {
    setCoordinates(pos.coords);
  }, []);

  const getCurrentPositionFailed = useCallback((err: PositionError) => {
    console.error(err);
    setGeolocationUnavailable(true);
  }, []);

  const handleLineInfoClick = useCallback(() => {
    setIsLinesModalShow(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsLinesModalShow(false);
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

  const [fetchStatiobnFunc, station, loading, fetchError] = useClosestStation();
  const [flickrFetchFunc, flickrPhoto] = useFlickrPhoto();

  const containerStyle = useMemo(
    () => ({
      background: `#333 url("${flickrPhoto}") no-repeat center center / cover`,
    }),
    [flickrPhoto]
  );

  useEffect(() => {
    if (station) {
      flickrFetchFunc(station);
    }
  }, [station, flickrFetchFunc]);

  if (coordinates) {
    const { latitude, longitude } = coordinates;
    fetchStatiobnFunc(latitude, longitude);
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

  return (
    <Layout>
      {station && (
        <Helmet>
          <title>{station.name} - NearStation</title>
          <meta name="description" content={`${station.name}駅`} />
          <meta name="og:description" content={`${station.name}駅`} />
          <meta
            name="og:url"
            content={`${process.env.PUBLIC_URL}/station/${station.groupId}`}
          />
          <meta name="og:title" content={`${station.name} - NearStation`} />
          <meta name="og:type" content="article" />
        </Helmet>
      )}
      <main className={styles.container} style={containerStyle}>
        <div className={styles.inner}>
          <h1 className={styles.name}>{station.name}</h1>
          <h2 className={styles.address}>{station.address}</h2>
          <button onClick={handleLineInfoClick} className={styles.button}>
            路線情報
          </button>
        </div>
      </main>
      <LinesModal
        station={station}
        lines={station.lines}
        closeModal={handleModalClose}
        isOpen={isLinesModalShow}
      />
    </Layout>
  );
};

export default memo(StationPage);
