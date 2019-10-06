import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrorModule } from '../../../components/error/error.module';
import { PostitModule } from '../../../components/postit/postit.module';
import { LinesComponent } from './lines.component';

@NgModule({
  declarations: [LinesComponent],
  exports: [LinesComponent],
  imports: [CommonModule, PostitModule, ErrorModule]
})
export class LinesModule {}
