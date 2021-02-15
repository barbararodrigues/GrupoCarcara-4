import { PlanoContaComponent } from './plano-conta/plano-conta.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../shared/components/home/home.component';

import { AreaLogadaComponent } from './area-logada.component';

const routes: Routes = [{
  path: '',
  component: AreaLogadaComponent,
  children: [{
    path: "",
    redirectTo: "home"
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'plano-conta',
    component: PlanoContaComponent,
  },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreaLogadaRoutingModule { }
