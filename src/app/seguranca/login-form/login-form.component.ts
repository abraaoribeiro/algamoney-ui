import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private authService: AuthService, 
    private errorHandler: ErrorHandlerService, 
    private router: Router) { }

  ngOnInit() {
  }

  login(usuario: string, password: string) {
    this.authService.login(usuario, password).then(() => {
      this.router.navigate(['/dashboard']);
    }).catch(erro => {
      this.errorHandler.handle(erro);
    });
  }
}
