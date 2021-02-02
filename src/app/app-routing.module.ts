import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CadastroComponent } from './area-nao-logada/cadastro/cadastro.component';
import { Erro404Component } from './erro404/erro404.component';
import { EstaLogadoGuard } from './shared/guards/esta-logado/esta-logado.guard';
import { NaoEstaLogadoGuard } from './shared/guards/nao-esta-logado/nao-esta-logado.guard';

const routes: Routes = [
{
  path: '',
  loadChildren: () => import('./area-nao-logada/area-nao-logada.module').then(m => m.AreaNaoLogadaModule),
  canActivate: [NaoEstaLogadoGuard],
},
{
  path: 'signedIn',
  loadChildren: () => import('./area-logada/area-logada.module').then(m => m.AreaLogadaModule),
  canActivate: [EstaLogadoGuard],
},
{
  path: '**',
  component: Erro404Component
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
