import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos'

  constructor(public httpClite: HttpClient) { }

  pesquisar(): Observable<any>{
    let headers = new HttpHeaders({
      'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    });
   return this.httpClite.get(`${this.lancamentosUrl}?resumo`, { headers }).pipe(
     map(res => res['content']));
  }
}
