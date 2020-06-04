import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';

import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

import { LancamentoService } from '../lancamento.service';
import { LancamentoFiltro } from './../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css'],
  preserveWhitespaces: true
})
export class LancamentosPesquisaComponent implements OnInit {

  @ViewChild('tabela') grid;

  filtro = new LancamentoFiltro();
  totalRegistros: number = 0;
  lancamentos = [];

  constructor(
    private confirmationService: ConfirmationService,
    private errorHandleService: ErrorHandlerService,
    private lancamentoService: LancamentoService,
    private toastyService: ToastyService,
    private title: Title
    ) { }

  ngOnInit() { 
    this.title.setTitle('Pesquisa de Lançamento');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.lancamentoService.pesquisar(this.filtro).then(resultado => {
      this.lancamentos = resultado.lancamentos;
      this.totalRegistros = resultado.total
    }).catch((erro) => this.errorHandleService.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmaExclucao(lancamento: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir ?',
      accept: () => this.excluir(lancamento),
    })

  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.id).then(() => {
      if (this.grid.first == 0) {
        this.pesquisar();
      } else {
        this.grid.first = 0;
      }
      this.toastyService.success('Lançamento excluído com sucesso');
    }).catch((erro) => this.errorHandleService.handle(erro));
  }
}
