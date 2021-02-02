import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AreaLogadaComponent } from './area-logada.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{
  path: '',
  component: AreaLogadaComponent,
  children: [{
      path: 'home',
      component: HomeComponent
    },
    {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreaLogadaRoutingModule { }
