import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { CurrencyMaskModule } from "ng2-currency-mask";
import { InputTextareaModule } from "primeng/inputtextarea";
import { SelectButtonModule } from "primeng/selectbutton";
import { InputTextModule } from "primeng/inputtext";
import { DataTableModule } from "primeng/datatable";
import { DropdownModule } from "primeng/dropdown";
import { CalendarModule } from "primeng/calendar";
import { TooltipModule } from "primeng/tooltip";
import {InputMaskModule} from 'primeng/inputmask';
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";

import { LancamentosPesquisaComponent } from "./lancamentos-pesquisa/lancamentos-pesquisa.component";
import { LancamentoCadastroComponent } from "./lancamento-cadastro/lancamento-cadastro.component";
import { PessoasPesquisaComponent } from "./pessoas-pesquisa/pessoas-pesquisa.component";
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { MessageComponent } from './message/message.component';
import { NavbarComponent } from "./navbar/navbar.component";
import { AppComponent } from "./app.component";
import { FormsModule } from '@angular/forms';

const PRIMENGINPORT = [
    TableModule,
    ButtonModule,
    TooltipModule,
    CalendarModule,
    DropdownModule,
    DataTableModule,
    InputMaskModule,
    InputTextModule,
    SelectButtonModule,
    InputTextareaModule
];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PessoaCadastroComponent,
    PessoasPesquisaComponent,
    LancamentosPesquisaComponent,
    LancamentoCadastroComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    CurrencyMaskModule,
    PRIMENGINPORT],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
