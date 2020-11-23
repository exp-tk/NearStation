import { useState, useCallback } from 'react';
import { Station, StationData } from '../models/StationAPI';
import client from '../apollo';
import { gql } from '@apollo/client';

const useStatiosByLineId = (): [
  (id: string) => void,
  Station[],
  Error | undefined
] => {
  const [stations, setStations] = useState<Station[]>([]);
  const [fetchError, setFetchError] = useState<Error>();

  const fetchStationByLineIdFunc = useCallback(async (id: string): Promise<
    void
  > => {
    try {
      const result = await client.query({
        query: gql`
          {
            stationsByLineId(lineId: "${id}") {
              id
              groupId
              prefId
              name
              nameK
              nameR
              address
              latitude
              longitude
              lines {
                id
                companyId
                lineColorC
                name
                nameR
                lineType
              }
            }
          }
        `,
      });
      const data = result.data as StationData;
      setStations(data.stationsByLineId);
    } catch (e) {
      setFetchError(e);
    }
  }, []);

  return [fetchStationByLineIdFunc, stations, fetchError];
};

export default useStatiosByLineId;
