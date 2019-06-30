import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LinesComponent } from './lines.component';

const routes: Routes = [
  {
    path: ':group_id',
    component: LinesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinesRoutingModule { }
