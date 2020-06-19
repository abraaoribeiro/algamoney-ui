import { Injectable } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toastyService: ToastyService) { }

  handle(errorResponse: HttpErrorResponse) {
    let msg: string;
    
    if (typeof errorResponse === 'string') {
    
      msg = errorResponse;

      
    } else if (errorResponse.status >= 400 && errorResponse.status <= 500) {
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
