import { BehaviorSubject, Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Station } from '../../models/StationAPI';
import { GeolocationService } from '../../services/geolocation/geolocation.service';
import { StationApiService } from '../../services/station-api/station-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public station: Station = null;
  public errors: Error[] = [];

  constructor(
    private stationApiService: StationApiService,
    private geolocationService: GeolocationService
  ) {}

  ngOnInit() {
    this.fetchNearestStation();
  }

  fetchNearestStation() {
    this.station = null;
    const geoLocationSub = this.geolocationService
      .getCurrentPosition()
      .subscribe(position => {
        const { latitude, longitude } = position.coords;
        const fetchStationSub = this.stationApiService
          .fetchNearestStation(latitude, longitude)
          .subscribe(station => {
            this.station = station;
          }, errors => {
            this.errors = errors;
          });
        if (this.subscriptions[0]) {
          this.subscriptions[0].unsubscribe();
        }
        this.subscriptions[0] = fetchStationSub;
      });
    if (this.subscriptions[1]) {
      this.subscriptions[1].unsubscribe();
    }
    this.subscriptions[1] = geoLocationSub;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
