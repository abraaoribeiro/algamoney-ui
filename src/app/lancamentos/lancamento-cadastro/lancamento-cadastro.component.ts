import { Component, OnInit } from "@angular/core";
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { Lancamento } from 'src/app/models/lancamento';

@Component({
  selector: "app-lancamento-cadastro",
  templateUrl: "./lancamento-cadastro.component.html",
  styleUrls: ["./lancamento-cadastro.component.css"],
  preserveWhitespaces: true
})
export class LancamentoCadastroComponent implements OnInit {
  tipos = [
    { label: "Receita", value: "RECEITA" },
    { label: "Despesa", value: "DESPESA" }
  ];

  categorias = [];

  pessoas = [];

  lancamento = new Lancamento();

  constructor(private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private erroHandlerService: ErrorHandlerService) { }

  ngOnInit() {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas().then((categorias) => {
      console.log(categorias);
      this.categorias = categorias.map(c => {
        return { label: c.nome, value: c.id }
      });

    }).catch(erro => this.erroHandlerService.handle(erro))
  }
  carregarPessoas() {
    this.pessoaService.listarTodas().then((pessoas) => {
      console.log(pessoas);
      
      this.pessoas = pessoas.content.map(p => {
        return { label: p.nome, value: p.id }
      })
    }).catch(error => this.erroHandlerService.handle(error))
  }
}
