import { useCallback, useState } from 'react';
import {
  GetStationByCoordinatesRequest,
  Station,
} from '../gen/proto/stationapi_pb';
import { grpcClient } from '../utils/grpc';

const useClosestStation = (): [
  (latitude: number, longitude: number) => void,
  Station | undefined,
  boolean,
  unknown
] => {
  const [station, setStation] = useState<Station>();
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<unknown>();

  const fetchStationFunc = useCallback(
    (latitude: number, longitude: number) => {
      (async (): Promise<void> => {
        try {
          const req = new GetStationByCoordinatesRequest({
            latitude,
            longitude,
          });
          const res = await grpcClient.getStationsByCoordinates(req);
          setStation(res.stations.at(0));
        } catch (e) {
          setFetchError(e);
        } finally {
          setLoading(false);
        }
      })();
    },
    []
  );

  return [fetchStationFunc, station, loading, fetchError];
};

export default useClosestStation;
