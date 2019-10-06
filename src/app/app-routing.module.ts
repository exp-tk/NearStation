import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: 'station',
    loadChildren: () =>
      import('./pages/station/station.module').then(mod => mod.StationModule)
  },
  {
    path: 'line',
    loadChildren: () =>
      import('./pages/belongs-stations/belongs-stations.module').then(mod => mod.BelongsStationsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
