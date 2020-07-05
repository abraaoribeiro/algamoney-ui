import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { ToastyService } from 'ng2-toasty';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { LancamentoService } from '../lancamento.service';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { Lancamento } from 'src/app/models/lancamento';
import { Title } from '@angular/platform-browser';

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

  //lancamento = new Lancamento();
  formulario:FormGroup;

  constructor(
    private erroHandlerService: ErrorHandlerService,
    private lancamentoService: LancamentoService,
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private toastService: ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title, 
    private formBuild:FormBuilder) { }

  ngOnInit() {
    this.title.setTitle('Novo Lançamento');
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.carregarPorId(id);
    }
    this.carregarCategorias();
    this.carregarPessoas();
    this.configurarFormulario();
  }

  get editando() {
    return Boolean(this.formulario.get('id').value);
  }

  configurarFormulario(){
    this.formulario = this.formBuild.group({
      id: [],
      tipo: [null,Validators.required],
      dataVencimento: [null, Validators.required],
      dataPagamento: [],
      descricao:[null, [Validators.required, Validators.minLength(5)]],
      valor: [null, Validators.required],
      pessoa: this.formBuild.group({
        id: [null, Validators.required],
        nome: [],
      }),
      categoria: this.formBuild.group({
        id: [null, Validators.required],
        nome: []
      }),
      observacao: []
    });
  }

  carregarPorId(id: number) {
    this.lancamentoService.buscarPorId(id).then((lancamento) => {
      this.formulario.patchValue(lancamento);
      this.atualizarTituloEdicao();
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

  salvar() {
    if (this.editando) {
      this.atualizar();
    } else {
      this.cadastrar();
    }
  }

  cadastrar() {
    this.lancamentoService.adicionar(this.formulario.value).then((lancamento) => {
      this.toastService.success('Lançamento adicionado com sucesso!');
      this.router.navigate(['/lancamentos', lancamento.id]);
    }).catch(error => this.erroHandlerService.handle(error));
  }

  atualizar() {
    this.lancamentoService.atualizar(this.formulario.value).then(lancamento => {
      this.formulario.patchValue(lancamento);
      this.atualizarTituloEdicao();
      this.toastService.success('Lançamento atualizado com sucesso!');
    }).catch(error => this.erroHandlerService.handle(error))
  }

  novo(){
    this.formulario.reset();
    setTimeout(function(){
      this.lancamento = new Lancamento();
    }.bind(this), 1)
    this.router.navigate(['/lancamentos/novo']);
  }
  
  atualizarTituloEdicao(){
   this.title.setTitle(`Edição de Lançamento: ${this.formulario.get('descricao').value}`) 
  }
}
