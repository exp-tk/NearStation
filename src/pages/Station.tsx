import React, { memo, useEffect } from 'react';
import styles from './Station.module.css';
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import useStation from '../hooks/useStation';
import Loading from '../components/Loading';
import ErrorScreen from '../components/ErrorScreen';
import useFlickrPhoto from '../hooks/useFlickrImage';

const StationPage: React.FC = () => {
  const { id } = useParams();

  const [station, loading, fetchError] = useStation(id);
  const [flickrFetchFunc, flickrPhoto] = useFlickrPhoto();

  useEffect(() => {
    if (station) {
      flickrFetchFunc(station);
    }
  }, [station, flickrFetchFunc]);

  if (loading) {
    return <Loading />;
  }

  if (fetchError) {
    return <ErrorScreen error="駅情報の取得に失敗しました。" />;
  }

  const containerStyle = {
    background: `#333 url("${flickrPhoto}") no-repeat center center / cover`,
  };

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
          <h1 className={styles.name}>{station?.name}</h1>
          <h2 className={styles.address}>{station?.address}</h2>
        </div>
      </main>
    </Layout>
  );
};

export default memo(StationPage);
