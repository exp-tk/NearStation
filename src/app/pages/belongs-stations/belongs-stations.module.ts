import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrorModule } from '../../components/error/error.module';
import { PostitModule } from '../../components/postit/postit.module';
import { BelongsStationsRoutingModule } from './belongs-stations-routing.module';
import { BelongsStationsComponent } from './belongs-stations.component';

@NgModule({
  declarations: [BelongsStationsComponent],
  imports: [
    CommonModule,
    BelongsStationsRoutingModule,
    PostitModule,
    ErrorModule
  ]
})
export class BelongsStationsModule {}
