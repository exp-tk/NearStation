import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BelongsStationsComponent } from './belongs-stations.component';

const routes: Routes = [
  {
    path: ':line_id',
    component: BelongsStationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BelongsStationsRoutingModule { }
