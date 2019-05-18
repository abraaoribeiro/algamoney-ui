import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

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

import { PessoasPesquisaComponent } from "./pessoas-pesquisa/pessoas-pesquisa.component";
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasGridComponent } from './pessoas-grid/pessoas-grid.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';
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
    MessageComponent,
    PessoasGridComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    LancamentosModule,
    PRIMENGINPORT],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
