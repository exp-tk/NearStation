import { useState, useEffect } from 'react';
import { Station, StationData } from '../models/StationAPI';
import client from '../apollo';
import { gql } from '@apollo/client';

const useStation = (
  id: string
): [Station | undefined, boolean, Error | undefined] => {
  const [station, setStation] = useState<Station>();
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<Error>();

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        const result = await client.query({
          query: gql`
          {
            searchStation(groupId: "${id}") {
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
        setStation(data.searchStation);
      } catch (e) {
        setFetchError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return [station, loading, fetchError];
};

export default useStation;
