import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { InputTextModule } from "primeng/inputtext";
import { DataTableModule } from "primeng/datatable";
import { TooltipModule } from "primeng/tooltip";
import {InputMaskModule} from 'primeng/inputmask';
import { ButtonModule } from "primeng/button";

import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasGridComponent } from './pessoas-grid/pessoas-grid.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';

const PRIMENGINPORT = [
  InputTextModule,
  ButtonModule,
  DataTableModule,
  TooltipModule,
  InputMaskModule
];

@NgModule({
  declarations: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent,
    PessoasGridComponent
  ],
  exports: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PRIMENGINPORT
  ]
})
export class PessoasModule { }
