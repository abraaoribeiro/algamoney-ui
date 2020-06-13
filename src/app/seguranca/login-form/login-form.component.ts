import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
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
    private toastyService:ToastyService,
    private router: Router) { }

  ngOnInit() {
  }

  login(usuario: string, password: string) {
    this.authService.login(usuario, password).then(() => {
      this.router.navigate(['/lancamentos']);
    }).catch(erro => {
      this.errorHandler.handle(erro);
    });
  }
}
