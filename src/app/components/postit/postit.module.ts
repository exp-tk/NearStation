import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PostitComponent } from '../postit/postit.component';

@NgModule({
  declarations: [PostitComponent],
  exports: [PostitComponent],
  imports: [CommonModule]
})
export class PostitModule {}
