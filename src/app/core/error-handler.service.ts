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
      errors = errorResponse.error;
      msg = errors[0].messagemUsuario;
    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Ocorreu um erro', errorResponse);
    }
    this.toastyService.error(msg);
  }
}
