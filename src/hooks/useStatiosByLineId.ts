import { useCallback, useState } from 'react';
import { GetStationByLineIdRequest, Station } from '../gen/proto/stationapi_pb';
import { grpcClient } from '../utils/grpc';

const useStatiosByLineId = (): [(id: number) => void, Station[], unknown] => {
  const [stations, setStations] = useState<Station[]>([]);
  const [fetchError, setFetchError] = useState<unknown>();

  const fetchStationByLineIdFunc = useCallback(
    async (id: number): Promise<void> => {
      try {
        const req = new GetStationByLineIdRequest({ lineId: id });
        const { stations } = await grpcClient.getStationsByLineId(req);
        setStations(stations);
      } catch (e) {
        setFetchError(e);
      }
    },
    []
  );

  return [fetchStationByLineIdFunc, stations, fetchError];
};

export default useStatiosByLineId;
