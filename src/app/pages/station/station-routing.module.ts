import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StationComponent } from './station.component';
import { LinesComponent } from './lines/lines.component';

const routes: Routes = [
  {
    path: ':group_id',
    component: StationComponent
  },
  {
    path: ':group_id/lines',
    component: LinesComponent
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StationRoutingModule {}
