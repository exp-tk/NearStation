import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PostitModule } from '../../components/postit/postit.module';
import { LinesComponent } from '../lines/lines.component';
import { LinesRoutingModule } from './lines-routing.module';

@NgModule({
  declarations: [LinesComponent],
  imports: [CommonModule, LinesRoutingModule, PostitModule]
})
export class LinesModule {}
