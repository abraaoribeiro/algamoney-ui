import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Contato } from 'src/app/models/contato';
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
  contatoIndex: number;
  estados: any[];
  cidades: any[];
  estadoSelecionado: number;

  constructor(private pessoaService: PessoaService,
    private messageService: MessageService,
    private erroHandleService: ErrorHandlerService,
    private route: ActivatedRoute,
    private title: Title,
    private router: Router) { }

  ngOnInit() {
    this.title.setTitle('Nova Pessoa');
    this.carregarEstados();
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.carregarPorId(id);
    }
  }


  get editado() {
    return Boolean(this.pessoa.id);
  }

  carregarCidades() {
    this.pessoaService.pesquisarCidades(this.estadoSelecionado).then(cidades => {
      this.cidades = cidades.map(uf => ({ label: uf.nome, value: uf.id }));
    }).catch(error => this.erroHandleService.handle(error));
  }

  carregarEstados() {
    this.pessoaService.listarEstados().then(estados => {
      this.estados = estados.map(uf => ({ label: uf.nome, value: uf.id }));
    }).catch(error => this.erroHandleService.handle(error));
  }

  carregarPorId(id: number) {
    this.pessoaService.buscarPorId(id).then(pessoa => {
      this.pessoa = pessoa;
      this.estadoSelecionado = (this.pessoa.endereco.cidade) ? this.pessoa.endereco.cidade.estado.id : null;
      
      if (this.estadoSelecionado) {
        this.carregarCidades();
      }
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
      this.messageService.add({ severity: 'success', detail: 'Pessoa adicionada com sucesso!' });
      this.router.navigate(['/pessoas', pessoa.id]);
    }).catch(error => this.erroHandleService.handle(error));
  }

  cadastrar(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa).then((pessoa) => {
      this.messageService.add({ severity: 'success', detail: 'Pessoa alterada com sucesso!' });
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
