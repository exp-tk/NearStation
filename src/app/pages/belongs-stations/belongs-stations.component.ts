import { Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Line, Station } from '../../models/StationAPI';
import { StationApiService } from '../../services/station-api/station-api.service';

@Component({
  selector: 'app-belongs-stations',
  templateUrl: './belongs-stations.component.html',
  styleUrls: ['./belongs-stations.component.scss']
})
export class BelongsStationsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public stations: Station[] = [];
  public line: Line = null;
  public errors: Error[] = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private stationApiService: StationApiService
  ) {}

  ngOnInit() {
    this.fetchStations();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private fetchStations() {
    const lineId = parseInt(this.route.snapshot.paramMap.get('line_id'), 10);
    const stationsSub = this.stationApiService.fetchStationByLineId(lineId).subscribe(stations => {
      this.stations = stations;
    }, err => {
      this.errors = err;
    });
    const lineSub = this.stationApiService.fetchLineByLineId(lineId).subscribe(line => {
      this.line = line;
    }, err => {
      this.errors = err;
    });
    this.subscriptions.push(stationsSub);
    this.subscriptions.push(lineSub);
  }

  public navigateToStation(station: Station) {
    this.router.navigate([`/station/${station.groupId}`]);
  }
}
