import { Injectable } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotAuthenticatedError } from '../seguranca/money-http-interceptor';


@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toastyService: ToastyService, private router:Router) { }

  handle(errorResponse: HttpErrorResponse) {
    let msg: string;
    
    if (typeof errorResponse === 'string') {
    
      msg = errorResponse;
      

    }else if(errorResponse instanceof NotAuthenticatedError){
        msg = 'Sua sessão expirou!';
      this.router.navigate(['/login']);
    } 
    
    else if (errorResponse.status >= 400 && errorResponse.status <= 500) {
      let errors;
      msg = 'Ocorreu um erro ao processar a sua solicitação';

      if (errorResponse.status === 403) {
        msg = 'Você não tem permissão para executar esta ação';
      }

      try {
        errors = errorResponse.error;

        msg = errors[0].mensagemUsuario;
      } catch (e) { }
    
    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
    }
    this.toastyService.error(msg);
  }
}
