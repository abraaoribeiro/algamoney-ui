import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../pessoa.service';
import { PessoaFiltro } from 'src/app/models/pessoa-filtro';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  filtro = new PessoaFiltro();
  totalRegistros: number = 0;
  pessoas = [];

  constructor(private pessoaService: PessoaService) { }

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
}
