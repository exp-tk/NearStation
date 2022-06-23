import { gql } from '@apollo/client';
import { useCallback, useState } from 'react';
import client from '../apollo';
import { Station, StationData } from '../models/StationAPI';

const useStation = (
  id: string | undefined
): [() => void, Station | undefined, boolean, unknown] => {
  const [station, setStation] = useState<Station>();
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<unknown>();

  const fetchStationFunc = useCallback(async (): Promise<void> => {
    try {
      const result = await client.query({
        query: gql`
          {
            stationByGroupId(groupId: "${id}") {
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
      setStation(data.stationByGroupId);
    } catch (e) {
      setFetchError(e);
    } finally {
      setLoading(false);
    }
  }, [id]);

  return [fetchStationFunc, station, loading, fetchError];
};

export default useStation;
