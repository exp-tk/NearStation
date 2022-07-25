import { gql } from '@apollo/client';
import { useCallback, useState } from 'react';
import client from '../apollo';
import { Station, StationData } from '../models/StationAPI';

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
          const result = await client.query({
            query: gql`
          {
            nearbyStations(latitude: ${latitude}, longitude: ${longitude}) {
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
          setStation(data.nearbyStations[0]);
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
