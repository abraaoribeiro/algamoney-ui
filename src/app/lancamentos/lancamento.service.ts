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

  constructor(public httpClient: HttpClient) { }

  async pesquisar(filtro: LancamentoFiltro): Promise<any> {
    let params;
    let headers = new HttpHeaders({ 'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==' });

    params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
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

    return await this.httpClient.get(`${this.lancamentosUrl}?resumo`, { headers, params: params })
      .toPromise()
      .then(res => {
        const lancamentos = res.content
        const responseJson = res;
        const resultado = {
          lancamentos,
          total: responseJson.totalElements,
        }
        return resultado;
      })
  }


 public excluir(id: number): Promise<void> {
    let headers = new HttpHeaders({ 'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==' });
    return this.httpClient
      .delete(`${this.lancamentosUrl}/${id}`, { headers })
      .toPromise().then(() => null);
  }


}
