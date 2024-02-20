import { useCallback, useState } from 'react';
import { Station } from '../gen/proto/stationapi_pb';

const useStatiosByLineId = (): [(id: number) => void, Station[], unknown] => {
  const [stations, setStations] = useState<Station[]>([]);
  const [fetchError, setFetchError] = useState<unknown>();

  const fetchStationByLineIdFunc = useCallback(
    async (id: number): Promise<void> => {
      try {
        setStations([]);
      } catch (e) {
        setFetchError(e);
      }
    },
    []
  );

  return [fetchStationByLineIdFunc, stations, fetchError];
};

export default useStatiosByLineId;
