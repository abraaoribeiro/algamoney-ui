import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Lancamento } from '../models/lancamento';
import { environment } from 'src/environments/environment';
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

  lancamentosUrl: string;

  constructor(public httpClient: HttpClient) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  async pesquisar(filtro: LancamentoFiltro): Promise<any> {
    let params;

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

    return await this.httpClient.get(`${this.lancamentosUrl}?resumo`, { params: params })
      .toPromise()
      .then((res: any) => {
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
    return this.httpClient
      .delete(`${this.lancamentosUrl}/${id}`)
      .toPromise().then(() => null);
  }

  public adicionar(lancamento: Lancamento): Promise<Lancamento> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.httpClient.post<Lancamento>(
      this.lancamentosUrl, lancamento, { headers })
      .toPromise();

  }

  public atualizar(lancamento: Lancamento): Promise<Lancamento> {
    return this.httpClient.put<Lancamento>(
      `${this.lancamentosUrl}/${lancamento.id}`, lancamento)
      .toPromise().then(lancamento => {
        this.converterStringParaDatas([lancamento])
        return lancamento;
      });

  }

  public buscarPorId(id: number): Promise<Lancamento> {
    return this.httpClient.get<Lancamento>(`${this.lancamentosUrl}/${id}`)
      .toPromise().then(lancamento => {
        this.converterStringParaDatas([lancamento]);
        return lancamento;
      });
  }

  private converterStringParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento,
        'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento,
          'YYYY-MM-DD').toDate();
      }
    }
  }
}
