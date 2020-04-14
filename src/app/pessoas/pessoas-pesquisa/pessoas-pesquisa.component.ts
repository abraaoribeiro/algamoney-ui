import { Component, OnInit, ViewChild } from '@angular/core';
import { PessoaService } from '../pessoa.service';
import { PessoaFiltro } from 'src/app/models/pessoa-filtro';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ConfirmationService } from 'primeng/api';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

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
    private toastyService: ToastyService,
    private errorHandleService:ErrorHandlerService) { }

  ngOnInit() {
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
      this.toastyService.success('Pessoa excluída com sucesso');
    }).catch((erro) => this.errorHandleService.handle(erro));
  }
}
