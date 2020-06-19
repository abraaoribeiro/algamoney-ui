import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";

const jwtHelpe = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauhttokenUrl = 'http://localhost:8080/oauth/token';
  jwpPayload: any;

  constructor(private http: HttpClient) {
    this.cerregarToken();
  }

  login(usuario: string, senha: string): Promise<void> {
    let headers = new HttpHeaders();

    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    headers = headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauhttokenUrl, body, { headers, withCredentials:true  }).toPromise().then((response: any) => {
      this.armazenarToken(response.access_token);
    }).catch(response => {
      const responseError = response.error;
      if (response.status == 400) {
        if (responseError.error === 'invalid_grant') {
          return Promise.reject('Usuário ou senha inválida');
        }
      }
      return Promise.reject(response);
    });
  }

  private armazenarToken(token: string) {
    const jwtHelpe = new JwtHelperService();
    this.jwpPayload = jwtHelpe.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private cerregarToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.armazenarToken(token);
    }
  }

  public temPermissao(permissao: string) {
    return this.jwpPayload && this.jwpPayload.authorities.includes(permissao);

  }

  public obterNovoAccesToken(): Promise<void> {
    let headers = new HttpHeaders();

    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    headers = headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = 'grant_type=refresh_token';

   return this.http.post(this.oauhttokenUrl, body, { headers, withCredentials:true }).toPromise().then((response: any) => {
      this.armazenarToken(response.access_token);
      return Promise.resolve(null);
    }).catch(response => {
      console.log('Erro ao renovar token', response);
      return Promise.resolve(null);
    });
  }


  public isAccessTokenInvalido(){
    const token = localStorage.getItem('token');
    return !token || jwtHelpe.isTokenExpired(token);
  }
}
