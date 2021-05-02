import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStation from '../hooks/useStation';
import Loading from '../components/Loading';
import ErrorScreen from '../components/ErrorScreen';
import useFlickrPhoto from '../hooks/useFlickrImage';
import PageCommon from '../components/PageCommon';

const StationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [fetchStationFunc, station, loading, fetchError] = useStation(id);
  const [flickrFetchFunc, flickrPhoto, photoLoading] = useFlickrPhoto();

  useEffect(() => {
    fetchStationFunc();
  }, [fetchStationFunc]);

  useEffect(() => {
    if (station) {
      flickrFetchFunc(station);
    }
  }, [station, flickrFetchFunc]);

  if (loading || !station) {
    return <Loading />;
  }

  if (fetchError) {
    return (
      <ErrorScreen
        onRetry={fetchStationFunc}
        error="駅情報の取得に失敗しました。"
      />
    );
  }

  return (
    <PageCommon
      photoLoading={photoLoading}
      notHome={true}
      station={station}
      photoUrl={flickrPhoto}
    />
  );
};

export default StationPage;
