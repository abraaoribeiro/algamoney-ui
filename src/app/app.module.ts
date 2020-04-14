import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";

import { LancamentosModule } from './lancamentos/lancamentos.module';
import { AppComponent } from "./app.component";
import { PessoasModule } from './pessoas/pessoas.module';
import { CoreModule } from './core/core.module';
import {ToastyModule} from 'ng2-toasty';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastyModule.forRoot(),
    LancamentosModule,
    PessoasModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
