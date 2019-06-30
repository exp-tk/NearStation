import { BehaviorSubject, Subscription } from 'rxjs';
import { Station } from 'src/app/models/StationAPI';
import { GeolocationService } from 'src/app/services/geolocation/geolocation.service';

import { Component, OnInit, OnDestroy } from '@angular/core';

import { StationApiService } from '../../services/station-api/station-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public station$ = new BehaviorSubject<Station>(null);

  constructor(
    private stationApiService: StationApiService,
    private geolocationService: GeolocationService
  ) {}

  ngOnInit() {
    this.fetchNearestStation();
  }

  fetchNearestStation() {
    const geoLocationSub = this.geolocationService
      .getCurrentPosition()
      .subscribe(position => {
        const { latitude, longitude } = position.coords;
        const fetchStationSub = this.stationApiService
          .fetchNearestStation(latitude, longitude)
          .subscribe(station => {
            this.station$.next(station);
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
