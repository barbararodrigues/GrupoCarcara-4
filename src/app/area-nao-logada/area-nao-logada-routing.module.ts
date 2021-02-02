import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AreaNaoLogadaComponent }  from './area-nao-logada.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from '../shared/components/home/home.component';


const routes: Routes = [{  
  path: '',
  component: AreaNaoLogadaComponent,
  children: [{
    path:"",
    redirectTo:"home"
  },
  {
    path:"home",
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signUp',
    component: CadastroComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreaNaoLogadaRoutingModule { }
