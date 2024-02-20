import { useCallback, useState } from 'react';
import { Station } from '../gen/proto/stationapi_pb';

const useFlickrPhoto = (): [
  (station: Station) => Promise<void>,
  string,
  boolean,
  unknown
] => {
  const [photoUrl, setPhotoUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<unknown>();

  const fetchFunc = useCallback(async (station: Station): Promise<void> => {
    setLoading(true);
    setPhotoUrl('');
    const flickrAccessToken = import.meta.env.VITE_FLICKR_ACCESS_TOKEN;
    // const flickrUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrAccessToken}&text=${station.name}駅&lat=${station.latitude}&lon=${station.longitude}&format=json&nojsoncallback=1`;
    const flickrUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrAccessToken}&text=${station.name}駅&format=json&nojsoncallback=1`;
    try {
      const res = await fetch(encodeURI(flickrUrl));
      const data = await res.json();
      const randomPhotoIndex = Math.floor(
        Math.random() * Math.floor(data.photos.photo.length)
      );
      const photo = data.photos.photo[randomPhotoIndex];
      if (!photo) {
        return;
      }
      const photoUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
      setPhotoUrl(photoUrl);
    } catch (e) {
      setFetchError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  return [fetchFunc, photoUrl, loading, fetchError];
};

export default useFlickrPhoto;
