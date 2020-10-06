import React, { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStation from '../hooks/useStation';
import Loading from '../components/Loading';
import ErrorScreen from '../components/ErrorScreen';
import useFlickrPhoto from '../hooks/useFlickrImage';
import PageCommon from '../components/PageCommon';

const StationPage: React.FC = () => {
  const { id } = useParams();

  const [station, loading, fetchError] = useStation(id);
  const [flickrFetchFunc, flickrPhoto] = useFlickrPhoto();

  useEffect(() => {
    if (station) {
      flickrFetchFunc(station);
    }
  }, [station, flickrFetchFunc]);

  if (loading || !station) {
    return <Loading />;
  }

  if (fetchError) {
    return <ErrorScreen error="駅情報の取得に失敗しました。" />;
  }

  return <PageCommon notHome={true} station={station} photoUrl={flickrPhoto} />;
};

export default memo(StationPage);
