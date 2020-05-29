import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { InputTextModule } from "primeng/inputtext";
import { DataTableModule } from "primeng/datatable";
import { TooltipModule } from "primeng/tooltip";
import {InputMaskModule} from 'primeng/inputmask';
import { ButtonModule } from "primeng/button";
import {TableModule} from 'primeng/table';


import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { SharedModule } from '../shared/shared.module';
import { MessageModule } from '../shared/message/message.component';

const PRIMENGINPORT = [
  InputTextModule,
  ButtonModule,
  DataTableModule,
  TooltipModule,
  InputMaskModule,
  TableModule
];

@NgModule({
  declarations: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent,
  ],
  exports: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MessageModule,
    PRIMENGINPORT
  ]
})
export class PessoasModule { }
