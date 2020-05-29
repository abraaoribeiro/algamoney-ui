import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PessoaService } from '../pessoa.service';
import { ToastyService } from 'ng2-toasty';
import { Pessoa } from 'src/app/models/pessoa';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css'],
  preserveWhitespaces: true
})
export class PessoaCadastroComponent implements OnInit {

  pessoa: Pessoa = new Pessoa();
  constructor(private pessoaService: PessoaService,
    private toastService: ToastyService,
    private erroHandleService: ErrorHandlerService) { }

  ngOnInit() {
  }

  salvar(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa).then(() => {
      this.toastService.success('Pessoa cadastrada com sucesso!');
      form.reset();
      this.pessoa = new Pessoa();
    }).catch(error => this.erroHandleService.handle(error));

  }

}
