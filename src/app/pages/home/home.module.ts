import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DotModule } from '../../components/dot/dot.module';
import { FABModule } from '../../components/fab/fab.module';
import { HeaderModule } from '../../components/header/header.module';
import { StationApiService } from '../../services/station-api/station-api.service';
import { HomeComponent } from '../home/home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HeaderModule,
    DotModule,
    FABModule
  ],
  providers: [StationApiService]
})
export class HomeModule { }
