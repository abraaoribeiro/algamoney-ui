import { NgxCurrencyModule } from 'ngx-currency';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { SelectButtonModule } from "primeng/selectbutton";
import { TableModule } from "primeng/table";
import { TooltipModule } from "primeng/tooltip";
import {FileUploadModule} from 'primeng/fileupload';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

import { SharedModule } from '../shared/shared.module';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoRoutingModule } from './lancamento-routing.module';



const PRIMENGINPORT = [
  TableModule,
  ButtonModule,
  TooltipModule,
  CalendarModule,
  DropdownModule,
  InputMaskModule,
  InputTextModule,
  SelectButtonModule,
  InputTextareaModule,
  FileUploadModule,
  ProgressSpinnerModule
];


@NgModule({
  declarations: [
    LancamentoCadastroComponent,
    LancamentosPesquisaComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
    SharedModule,
    LancamentoRoutingModule,
    HttpClientModule,
    PRIMENGINPORT

  ]
})
export class LancamentosModule { }
