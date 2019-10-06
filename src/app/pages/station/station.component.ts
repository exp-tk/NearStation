import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Station } from '../../models/StationAPI';
import { StationApiService } from '../../services/station-api/station-api.service';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})
export class StationComponent implements OnInit {
  public station: Station;
  public errors: Error[] = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private stationApiService: StationApiService
  ) {}

  ngOnInit() {
    const groupId = parseInt(this.route.snapshot.paramMap.get('group_id'), 10);
    this.stationApiService.fetchStationByGroupId(groupId).subscribe(station => {
      this.station = station;
    }, err => {
      this.errors = err;
    });
  }

  public forwardToLineInfo(lineId: number) {
    this.router.navigate([`/line/${lineId}`]);
  }
}
