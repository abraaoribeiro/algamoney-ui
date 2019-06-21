import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import * as moment from 'moment';
export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina: number = 0;
  itensPorPagina: number = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos'

  constructor(public httpClite: HttpClient) { }

  async pesquisar(filtro: LancamentoFiltro): Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders({ 'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==' });

    params = new HttpParams().set('page', filtro.pagina.toString());
    params = new HttpParams().set('size', filtro.itensPorPagina.toString());

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

    return await this.httpClite.get(`${this.lancamentosUrl}?resumo`, { headers, params: params })
      .toPromise()
      .then(res => {
        const lancamentos = res.content;
        const responseJson = res;
        const resultado = {
          lancamentos,
          total: responseJson.totalElements,
        }
        return resultado;
      })
  }
}
