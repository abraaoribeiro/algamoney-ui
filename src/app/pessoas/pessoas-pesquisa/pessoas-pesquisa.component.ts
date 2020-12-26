import { Component, OnInit, ViewChild } from '@angular/core';
import { PessoaService } from '../pessoa.service';
import { PessoaFiltro } from 'src/app/models/pessoa-filtro';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  @ViewChild('tabela') grid;
  filtro = new PessoaFiltro();
  totalRegistros: number = 0;
  pessoas = [];

  constructor(private pessoaService: PessoaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private errorHandleService: ErrorHandlerService,
    private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Pessoas');
  }
  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.pessoaService.pesquisar(this.filtro).then(resultado => {
      this.pessoas = resultado.pessoas;
      this.totalRegistros = resultado.total
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);

  }

  confirmaExclucao(pessoa: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir ?',
      accept: () => this.excluir(pessoa),
    })
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.id).then(() => {
      if (this.grid.first == 0) {
        this.pesquisar();
      } else {
        this.grid.first = 0;
      }
      this.messageService.add({ severity: 'success', detail: 'Pesssoa excluída com sucesso!' });
    }).catch((error) => this.errorHandleService.handle(error));
  }

  mudarStatus(pessoa: any):void {
    const novoStatus = !pessoa.ativo;

    this.pessoaService.mudarStatus(pessoa.id, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';

        pessoa.ativo = novoStatus;
        this.messageService.add({ severity: 'success', detail: `Pessoa ${acao} com sucesso!` });
      })
      .catch(erro => this.errorHandleService.handle(erro));
  }
}
