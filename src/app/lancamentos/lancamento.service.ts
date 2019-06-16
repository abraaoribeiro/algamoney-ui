import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
export interface LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos'

  constructor(public httpClite: HttpClient) { }

  pesquisar(filtro: LancamentoFiltro): Observable<any> {
    let params;
    let headers = new HttpHeaders({
      'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==',
    });
    if (filtro.descricao) {
      params = new HttpParams().set('descricao', filtro.descricao);
    }
    if (filtro.dataVencimentoInicio) {
      params = new HttpParams().set('dataVencimentoDe',
        moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }
    if (filtro.dataVencimentoFim) {
      params = new HttpParams().set('dataVencimentoAte',
        moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.httpClite.get(`${this.lancamentosUrl}?resumo`, { headers, params: params }).pipe(
      map(res => res['content']));
  }
}
