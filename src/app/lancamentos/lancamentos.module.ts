import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { DataTableModule } from "primeng/datatable";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { SelectButtonModule } from "primeng/selectbutton";
import { TableModule } from "primeng/table";
import { TooltipModule } from "primeng/tooltip";
import { SharedModule } from '../shared/shared.module';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { RouterModule } from '@angular/router';




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
    LancamentoCadastroComponent,
    LancamentosPesquisaComponent,
  ],
  exports: [
    LancamentoCadastroComponent,
    LancamentosPesquisaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CurrencyMaskModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    PRIMENGINPORT

  ]
})
export class LancamentosModule { }
