import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StationComponent } from './station.component';
import { LineComponent } from '../line/line.component';
import { StationService } from '../services/station/station.service';
import { WebSocketService } from '../services/websocket/web-socket.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    StationComponent,
    LineComponent
  ],
  exports: [
    StationComponent
  ],
  providers: [
    WebSocketService,
    StationService
  ]
})
export class StationModule { }
