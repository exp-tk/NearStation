import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FABComponent } from '../fab/fab.component';

@NgModule({
  declarations: [FABComponent],
  exports: [FABComponent],
  imports: [CommonModule, FontAwesomeModule]
})
export class FABModule {}
