import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePT from '@angular/common/locales/pt';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoginComponent } from "./login/login.component";
import { AreaNaoLogadaRoutingModule } from './area-nao-logada-routing.module';
import { CadastroComponent } from './cadastro/cadastro.component';
import { AreaNaoLogadaComponent } from './area-nao-logada.component';
import { SharedModule } from '../shared/shared.module';
import { IConfig, NgxMaskModule } from 'ngx-mask';

registerLocaleData(localePT, 'pt');

@NgModule({
  declarations: [
    LoginComponent,
    CadastroComponent,
    AreaNaoLogadaComponent
  ],
  imports: [
    CommonModule,
    AreaNaoLogadaRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pt'
  }, {
    provide: DEFAULT_CURRENCY_CODE,
    useValue: 'BRL'
  }],
})
export class AreaNaoLogadaModule { }
