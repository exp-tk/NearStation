import { useState, useCallback } from 'react';
import { Station, StationData } from '../models/StationAPI';
import client from '../apollo';
import { gql } from '@apollo/client';

const useClosestStation = (): [
  (latitude: number, longitude: number) => void,
  Station | undefined,
  boolean,
  Error | undefined
] => {
  const [station, setStation] = useState<Station>();
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<Error>();

  const fetchStationFunc = useCallback(
    (latitude: number, longitude: number) => {
      (async (): Promise<void> => {
        try {
          const result = await client.query({
            query: gql`
          {
            stationByCoords(latitude: ${latitude}, longitude: ${longitude}) {
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
          setStation(data.stationByCoords);
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
