import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from '../button/button.module';
import { DotModule } from '../dot/dot.module';
import { StationPanelComponent } from './station-panel.component';

@NgModule({
  declarations: [StationPanelComponent],
  exports: [StationPanelComponent],
  imports: [
    CommonModule,
    DotModule,
    ButtonModule
  ]
})
export class StationPanelModule { }
