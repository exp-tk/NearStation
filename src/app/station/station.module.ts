import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StationComponent } from './station.component';
import { LineComponent } from '../line/line.component';
import { StationService } from '../services/station/station.service';
import { WebSocketService } from '../services/websocket/web-socket.service';
import { UploadService } from '../services/upload/upload.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
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
    StationService,
    UploadService
  ]
})
export class StationModule { }
