import { Component, OnInit } from '@angular/core';
import { LineModel } from '../models/line-model';
import { StationService } from '../services/station/station.service';
import { Subject } from 'rxjs/Subject';
import { Wsmodel } from '../models/wsmodel';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { StationModel } from '../models/station-model';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})
export class StationComponent implements OnInit, AfterViewInit {

  lines: LineModel[];
  station: StationModel;

  initialized =  false;

  private sub: Subject<any>;

  constructor(private stationSvc: StationService) { }

  ngOnInit() {
    this.connectWS();
  }

  ngAfterViewInit() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((pos: Position) => {
        const msg: Wsmodel = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        };
        this.sub.next(msg);
      });
    }
  }

   connectWS() {
    this.sub = this.stationSvc.connect();

    this.sub.subscribe((resp: StationModel) => {
      this.station = resp;
      this.lines = resp.lines;
      this.initialized = true;
    });
   }

}
