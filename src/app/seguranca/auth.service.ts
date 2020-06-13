import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";



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

    return this.http.post(this.oauhttokenUrl, body, { headers }).toPromise().then((response:any) => {
      this.armazenarToken(response.access_token);
    }).catch(response => {
      console.log(response);
    });
  }

  private armazenarToken(token: string) {
    const jwtHelpe = new JwtHelperService();
    this.jwpPayload = jwtHelpe.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private cerregarToken(){
    const token = localStorage.getItem('token');
    if(token) {
      this.armazenarToken(token);
    }
  }
}
