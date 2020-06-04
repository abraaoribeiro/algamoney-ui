import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from "primeng/button";
import { DataTableModule } from "primeng/datatable";
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from 'primeng/table';
import { TooltipModule } from "primeng/tooltip";
import { SharedModule } from '../shared/shared.module';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { RouterModule } from '@angular/router';




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
  exports: [],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
    PRIMENGINPORT
  ]
})
export class PessoasModule { }
