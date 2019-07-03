import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from '../../components/button/button.module';
import { DotModule } from '../../components/dot/dot.module';
import { FABModule } from '../../components/fab/fab.module';
import { StationApiService } from '../../services/station-api/station-api.service';
import { HomeComponent } from '../home/home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    DotModule,
    FABModule,
    ButtonModule
  ],
  providers: [StationApiService]
})
export class HomeModule { }
