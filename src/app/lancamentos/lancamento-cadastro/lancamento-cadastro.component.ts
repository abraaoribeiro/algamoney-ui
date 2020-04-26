import { Component, OnInit } from "@angular/core";
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

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

  pessoas = [
    { label: "João da Silva", value: 1 },
    { label: "Sebastiao Souza", value: 2 },
    { label: "Maria Silva", value: 3 }
  ];

  constructor(private categoriaService: CategoriaService,
    private erroHandlerService: ErrorHandlerService) { }

  ngOnInit() { 
    this.carregarCategorias();
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas().then((categorias) => {
      this.categorias = categorias.map(c => {
        return { label: c.nome, value: c.id }
      });

    }).catch(erro => this.erroHandlerService.handle(erro))
  }

}
