import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from "primeng/button";
import { DataTableModule } from "primeng/datatable";
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from 'primeng/table';
import { TooltipModule } from "primeng/tooltip";
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';

import { SharedModule } from '../shared/shared.module';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoaRoutingModule } from './pessoa-routing.module';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroContatoComponent } from './pessoa-cadastro-contato/pessoa-cadastro-contato.component';


const PRIMENGINPORT = [
  InputTextModule,
  ButtonModule,
  DataTableModule,
  TooltipModule,
  InputMaskModule,
  TableModule,
  PanelModule,
  DialogModule,
  DropdownModule
];

@NgModule({
  declarations: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent,
    PessoaCadastroContatoComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    PessoaRoutingModule,
    FormsModule,
    SharedModule,
    PRIMENGINPORT
  ]
})
export class PessoasModule { }
