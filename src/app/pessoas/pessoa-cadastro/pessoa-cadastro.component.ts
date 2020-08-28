import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Pessoa } from 'src/app/models/pessoa';
import { PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css'],
  preserveWhitespaces: true
})
export class PessoaCadastroComponent implements OnInit {

  pessoa: Pessoa = new Pessoa();
  exbindoFormularioContato = false;
  contato: Contato;

  constructor(private pessoaService: PessoaService,
    private toastService: ToastyService,
    private erroHandleService: ErrorHandlerService,
    private route: ActivatedRoute,
    private title: Title,
    private router: Router) { }

  ngOnInit() {
    this.title.setTitle('Nova Pessoa');
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.carregarPorId(id);
    }
  }

  prepararNovoContato() {
    this.exbindoFormularioContato = true;
    this.contato = {
      nome: '',
      email: '',
      telefone: ''
    }
  }
  get editado() {
    return Boolean(this.pessoa.id);
  }

  carregarPorId(id: number) {
    this.pessoaService.buscarPorId(id).then(pessoa => {
      this.pessoa = pessoa;
      this.atualizarTituloEdicao();
    }).catch(error => this.erroHandleService.handle(error));
  }

  salvar(form: FormControl) {
    if (this.editado) {
      this.atualizar(form);
    } else {
      this.cadastrar(form);
    }
  }

  atualizar(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa).then(pessoa => {
      this.pessoa = pessoa;
      this.atualizarTituloEdicao();
      this.toastService.success('Pessoa atualizada com sucesso!');
      this.router.navigate(['/pessoas', pessoa.id]);
    }).catch(error => this.erroHandleService.handle(error));
  }

  cadastrar(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa).then((pessoa) => {
      this.toastService.success('Pessoa cadastrada com sucesso!');
      this.router.navigate(['/pessoas', pessoa.id]);
    }).catch(error => this.erroHandleService.handle(error));
  }

  novo(form: FormControl) {
    form.reset();
    setTimeout(function () {
      this.lancamento = new Pessoa();
    }.bind(this), 1)
    this.router.navigate(['pessoas/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Pessoa: ${this.pessoa.nome}`)
  }
}
