import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { Station, StationByCoordsData, StationData, StationsByLineIdData, Line, LineByIdData } from '../../models/StationAPI';

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
      }, err => {
        observer.error(err);
      });
    });
  }

  public fetchStationByGroupId(groupId: number): Observable<Station> {
    return new Observable<Station>(observer => {
      this.apollo
      .watchQuery({
        query: gql`
        {
          searchStation(groupId: ${groupId}) {
            name
            address
            groupId
            lines {
              id
              lineColorC
              name
            }
          }
        }`,
      })
      .valueChanges.subscribe(result => {
        if (result.errors) {
          return observer.error(result.errors);
        }
        const data = result.data as StationData;
        observer.next(data.searchStation);
      }, err => {
        observer.error(err);
      });
    });
  }

  public fetchStationByLineId(lineId: number): Observable<Station[]> {
    return new Observable<Station[]>(observer => {
      this.apollo
      .watchQuery({
        query: gql`
        {
          stationsByLineId(lineId: ${lineId}) {
            name
            address
            groupId
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
        const data = result.data as StationsByLineIdData;
        observer.next(data.stationsByLineId);
      }, err => {
        observer.error(err);
      });
    });
  }

  public fetchLineByLineId(lineId: number): Observable<Line> {
    return new Observable<Line>(observer => {
      this.apollo
      .watchQuery({
        query: gql`
        {
          line(id: ${lineId}) {
            name
            lineColorC
          }
        }        `,
      })
      .valueChanges.subscribe(result => {
        if (result.errors) {
          return observer.error(result.errors);
        }
        const data = result.data as LineByIdData;
        observer.next(data.line);
      }, err => {
        observer.error(err);
      });
    });
  }
}
