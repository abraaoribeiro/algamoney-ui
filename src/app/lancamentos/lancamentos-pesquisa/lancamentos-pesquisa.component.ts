import { Component, OnInit } from '@angular/core';
import { LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css'],
  preserveWhitespaces: true
})
export class LancamentosPesquisaComponent implements OnInit {
  
  title = 'algamoney-ui';
  lancamentos = [];
  descricao:string;

  constructor(private lancamentoService:LancamentoService) { }

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar(){
    this.lancamentoService.pesquisar({descricao: this.descricao}).subscribe((data) => {
      this.lancamentos = data;
      console.log(this.lancamentos);
      
    });
  }


}
