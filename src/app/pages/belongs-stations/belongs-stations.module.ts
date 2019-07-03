import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BelongsStationsRoutingModule } from './belongs-stations-routing.module';
import { BelongsStationsComponent } from './belongs-stations.component';
import { PostitModule } from 'src/app/components/postit/postit.module';

@NgModule({
  declarations: [BelongsStationsComponent],
  imports: [CommonModule, BelongsStationsRoutingModule, PostitModule]
})
export class BelongsStationsModule {}
