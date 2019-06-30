import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { Station, StationByCoordsData, StationData } from '../../models/StationAPI';

@Injectable({
  providedIn: 'root'
})
export class StationApiService {
  constructor(private apollo: Apollo) {}

  public fetchNearestStation(latitude: number, longitude: number): Observable<Station> {
    return new Observable<Station>(observer => {
      this.apollo
      .watchQuery({
        query: gql`
        {
          stationByCoords(latitude: ${latitude}, longitude: ${longitude}) {
            groupId
            name
            address
            lines {
              id
              lineColorC
              name
            }
          }
        }        `,
      })
      .valueChanges.subscribe(result => {
        if (result.errors) {
          return observer.error(result.errors);
        }
        const data = result.data as StationByCoordsData;
        observer.next(data.stationByCoords);
      });
    });
  }

  public fetchStationByGroupId(groupId: string): Observable<Station> {
    return new Observable<Station>(observer => {
      this.apollo
      .watchQuery({
        query: gql`
        {
          station(id: ${groupId}) {
            name
            address
            lines {
              id
              lineColorC
              name
            }
          }
        }        `,
      })
      .valueChanges.subscribe(result => {
        if (result.errors) {
          return observer.error(result.errors);
        }
        const data = result.data as StationData;
        observer.next(data.station);
      });
    });
  }
}
