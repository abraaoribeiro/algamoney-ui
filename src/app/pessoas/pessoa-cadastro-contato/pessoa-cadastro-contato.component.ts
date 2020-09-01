import { Component, OnInit, Input } from '@angular/core';
import { Pessoa } from 'src/app/models/pessoa';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pessoa-cadastro-contato',
  templateUrl: './pessoa-cadastro-contato.component.html',
  styleUrls: ['./pessoa-cadastro-contato.component.css']
})
export class PessoaCadastroContatoComponent implements OnInit {

  contato: Contato;

  exbindoFormularioContato = false;

  contatoIndex: number;

  @Input()
  pessoa: Pessoa;
  constructor() { }

  ngOnInit() {
  }

  prepararNovoContato() {
    this.exbindoFormularioContato = true;
    this.contato = {
      nome: '',
      email: '',
      telefone: ''
    }
    this.contatoIndex = this.pessoa.contatos.length;
  }

  prepararEdicaoContato(contato: Contato, index: number) {
    this.contato = this.clonarContato(contato);
    this.exbindoFormularioContato = true;
    this.contatoIndex = index;
  }

  removendoContato(index: number) {
    this.pessoa.contatos.splice(index, 1);
  }
  confirmarContato(frm: FormControl) {
    this.pessoa.contatos[this.contatoIndex] = this.clonarContato(this.contato);
    this.exbindoFormularioContato = false;
    frm.reset();
  }

  clonarContato(contato: Contato): Contato {
    return contato = {
      id: contato.id,
      nome: contato.nome,
      email: contato.email,
      telefone: contato.telefone
    };

  }

  get editado() {
    return this.contato && this.contato.id;
  }

}
