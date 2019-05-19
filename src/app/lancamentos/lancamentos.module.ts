import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextareaModule } from "primeng/inputtextarea";
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { SelectButtonModule } from "primeng/selectbutton";
import { InputTextModule } from "primeng/inputtext";
import { DataTableModule } from "primeng/datatable";
import { DropdownModule } from "primeng/dropdown";
import { CalendarModule } from "primeng/calendar";
import { TooltipModule } from "primeng/tooltip";
import {InputMaskModule} from 'primeng/inputmask';
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";

import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoGridComponent } from './lancamento-grid/lancamento-grid.component';
import { SharedModule } from 'primeng/components/common/shared';


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
    LancamentoGridComponent,
    LancamentosPesquisaComponent,
  ],
  exports: [
    LancamentoCadastroComponent,
    LancamentosPesquisaComponent,
    LancamentoGridComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CurrencyMaskModule,
    SharedModule,
    PRIMENGINPORT

  ]
})
export class LancamentosModule { }
