import { PlanoContaComponent } from './plano-conta/plano-conta.component';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

import { SharedModule } from '../shared/shared.module';
import { AreaLogadaRoutingModule } from './area-logada-routing.module';
import { AreaLogadaComponent } from './area-logada.component';


@NgModule({
  declarations: [
    AreaLogadaComponent,
    PlanoContaComponent   
  ],
  imports: [
    CommonModule,
    AreaLogadaRoutingModule,
    FormsModule,
    SharedModule,
    NgxMaskModule.forRoot(),
  ],
  providers:[
    DatePipe
  ]
})
export class AreaLogadaModule { }
