import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos'

  constructor(public httpClite: HttpClient) { }

  pesquisar(filtro:any): Observable<any>{
    let params;
    let headers = new HttpHeaders({
      'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==',
    });
    if (filtro.descricao){
      params = new HttpParams().set('descricao', filtro.descricao);
    }
   return this.httpClite.get(`${this.lancamentosUrl}?resumo`, { headers, params: params}).pipe(
     map(res => res['content']));
  }
}
