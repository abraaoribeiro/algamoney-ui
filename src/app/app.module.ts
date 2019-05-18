import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";

import { LancamentosModule } from './lancamentos/lancamentos.module';
import { MessageComponent } from './message/message.component';
import { NavbarComponent } from "./navbar/navbar.component";
import { AppComponent } from "./app.component";
import { PessoasModule } from './pessoas/pessoas.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    LancamentosModule,
    PessoasModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
