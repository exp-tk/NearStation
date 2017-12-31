import { Injectable } from '@angular/core';
import { WebSocketService } from '../WebSocket/web-socket.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Wsmodel } from '../../models/wsmodel';

@Injectable()
export class StationService {

  private station: Subject<any>;

  constructor(private ws: WebSocketService) { }

  private url(): string {
    return 'wss://sapi.tinykitten.me/ws';
  }

  connect(): Subject<any> {
    return this.station = <Subject<any>>this.ws
      .connect(this.url())
      .map((response: MessageEvent): any => {
        const data = JSON.parse(response.data) as any;
        return data;
      });
  }

  send(_lat: number, _lon: number) {
    const resp = this.station.next(this.createMessage(_lat, _lon));
    console.log(resp);
  }

  private createMessage(_lat: number, _lon: number): Wsmodel {
    const message: Wsmodel = {
      lat: _lat,
      lon: _lon
    };
    return message;
  }
}
