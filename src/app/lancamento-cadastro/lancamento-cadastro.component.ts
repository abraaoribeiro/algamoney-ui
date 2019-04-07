import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-lancamento-cadastro",
  templateUrl: "./lancamento-cadastro.component.html",
  styleUrls: ["./lancamento-cadastro.component.css"]
})
export class LancamentoCadastroComponent implements OnInit {
  tipos = [
    { label: "Receita", value: "RECEITA" },
    { label: "Despesa", value: "DESPESA" }
  ];

  categorias = [
    { label: "Alimento", value: 1 },
    { label: "Transporte", value: 1 }
  ];

  pessoas = [
    { label: "João da Silva", value: 1 },
    { label: "Sebastiao Souza", value: 2 },
    { label: "Maria Silva", value: 3 }
  ];

  constructor() {}

  ngOnInit() {}
}
