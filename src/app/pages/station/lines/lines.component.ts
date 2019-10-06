import { BehaviorSubject } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Station } from '../../../models/StationAPI';
import { StationApiService } from '../../../services/station-api/station-api.service';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.scss']
})
export class LinesComponent implements OnInit {
  public station: Station = null;
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
