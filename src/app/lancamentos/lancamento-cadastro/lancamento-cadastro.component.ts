import { Component, OnInit } from "@angular/core";
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { Lancamento } from 'src/app/models/lancamento';
import { FormControl } from '@angular/forms';
import { ToastyService } from 'ng2-toasty';
import { LancamentoService } from '../lancamento.service';
import { ActivatedRoute } from '@angular/router';

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
    private erroHandlerService: ErrorHandlerService,
    private lancamentoService: LancamentoService,
    private toastService: ToastyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.carregarPorId(id);
    }
    this.carregarCategorias();
    this.carregarPessoas();
  }

  get editando() {
    return Boolean(this.lancamento.id);
  }

  carregarPorId(id: number) {
    this.lancamentoService.buscarPorId(id).then((lancamento) => {
      this.lancamento = lancamento;
    }).catch(erro => this.erroHandlerService.handle(erro));
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas().then((categorias) => {
      // Convertendo os valores para o formato no select do primeng atráves do map.
      this.categorias = categorias.map(c => {
        return { label: c.nome, value: c.id }
      });
    }).catch(erro => this.erroHandlerService.handle(erro))
  }

  carregarPessoas() {
    this.pessoaService.listarTodas().then((pessoas) => {
      this.pessoas = pessoas.content.map(p => {
        return { label: p.nome, value: p.id }
      })
    }).catch(error => this.erroHandlerService.handle(error))
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizar(form);
    }else {
      this.cadastrar(form);
    }
  }

  cadastrar(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento).then(() => {
      this.toastService.success('Lançamento adicionado com sucesso!');
      form.reset();
      this.lancamento = new Lancamento();
    }).catch(error => this.erroHandlerService.handle(error));
  }

  atualizar(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento).then(lancamento => {
      this.lancamento = lancamento;
      this.toastService.success('Lançamento atualizado com sucesso!');
    
    }).catch(error => this.erroHandlerService.handle(error))
  }
}
