import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from '../../components/button/button.module';
import { FABModule } from '../../components/fab/fab.module';
import { StationPanelModule } from '../../components/station-panel/station-panel.module';
import { StationApiService } from '../../services/station-api/station-api.service';
import { HomeComponent } from '../home/home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ButtonModule,
    StationPanelModule,
    FABModule
  ],
  providers: [StationApiService]
})
export class HomeModule { }
