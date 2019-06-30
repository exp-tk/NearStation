import { Component, OnInit } from '@angular/core';
import { StationApiService } from 'src/app/services/station-api/station-api.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Station } from 'src/app/models/StationAPI';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.scss']
})
export class LinesComponent implements OnInit {
  public thisStation$ = new BehaviorSubject<Station>(null);

  constructor(private route: ActivatedRoute, private stationApiService: StationApiService) {}

  ngOnInit() {
    const groupId = this.route.snapshot.paramMap.get('group_id');
    this.stationApiService.fetchStationByGroupId(groupId).subscribe(station => {
      this.thisStation$.next(station);
    });
  }
}
