import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrorModule } from '../../components/error/error.module';
import { StationPanelModule } from '../../components/station-panel/station-panel.module';
import { LinesModule } from './lines/lines.module';
import { StationRoutingModule } from './station-routing.module';
import { StationComponent } from './station.component';

@NgModule({
  declarations: [StationComponent],
  exports: [StationComponent],
  imports: [
    CommonModule,
    StationRoutingModule,
    StationPanelModule,
    LinesModule,
    ErrorModule
  ]
})
export class StationModule { }
