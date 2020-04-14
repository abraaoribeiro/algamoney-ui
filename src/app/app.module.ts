import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from '@angular/forms';
import { NgModule, LOCALE_ID } from "@angular/core";

import { LancamentosModule } from './lancamentos/lancamentos.module';
import { AppComponent } from "./app.component";
import { PessoasModule } from './pessoas/pessoas.module';
import { CoreModule } from './core/core.module';
import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastyModule.forRoot(),
    ConfirmDialogModule,
    LancamentosModule,
    PessoasModule,
    CoreModule
  ],
  providers: [
    ConfirmationService,
   // {provide:LOCALE_ID, useValue: 'pt-BR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
