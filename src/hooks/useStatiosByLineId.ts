import { gql } from '@apollo/client';
import { useCallback, useState } from 'react';
import client from '../apollo';
import { Station, StationData } from '../models/StationAPI';

const useStatiosByLineId = (): [
  (id: string | undefined) => void,
  Station[],
  unknown
] => {
  const [stations, setStations] = useState<Station[]>([]);
  const [fetchError, setFetchError] = useState<unknown>();

  const fetchStationByLineIdFunc = useCallback(
    async (id: string | undefined): Promise<void> => {
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
    },
    []
  );

  return [fetchStationByLineIdFunc, stations, fetchError];
};

export default useStatiosByLineId;
