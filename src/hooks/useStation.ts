import { useCallback, useState } from 'react';
import {
  GetStationByGroupIdRequest,
  Station,
} from '../gen/proto/stationapi_pb';
import { grpcClient } from '../utils/grpc';

const useStation = (
  groupId: number
): [() => void, Station | undefined, boolean, unknown] => {
  const [station, setStation] = useState<Station>();
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<unknown>();

  const fetchStationFunc = useCallback(async (): Promise<void> => {
    try {
      const req = new GetStationByGroupIdRequest({ groupId });
      const res = await grpcClient.getStationsByGroupId(req);

      setStation(res.stations.at(0));
    } catch (e) {
      setFetchError(e);
    } finally {
      setLoading(false);
    }
  }, [groupId]);

  return [fetchStationFunc, station, loading, fetchError];
};

export default useStation;
