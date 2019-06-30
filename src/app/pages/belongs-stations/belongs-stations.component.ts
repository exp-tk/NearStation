import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StationApiService } from '../../services/station-api/station-api.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Station, Line } from 'src/app/models/StationAPI';

@Component({
  selector: 'app-belongs-stations',
  templateUrl: './belongs-stations.component.html',
  styleUrls: ['./belongs-stations.component.scss']
})
export class BelongsStationsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public stations$ = new BehaviorSubject<Station[]>([]);
  public line$ = new BehaviorSubject<Line>(null);

  constructor(
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
      this.stations$.next(stations);
    });
    const lineSub = this.stationApiService.fetchLineByLineId(lineId).subscribe(line => {
      this.line$.next(line);
    });
    this.subscriptions.push(stationsSub);
    this.subscriptions.push(lineSub);
  }
}
