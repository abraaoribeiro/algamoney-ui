import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PessoaFiltro } from '../models/pessoa-filtro';


@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  pessoasUrl = 'http://localhost:8080/pessoas'

  constructor(private httpClient: HttpClient) { }


  public async pesquisar(filtro: PessoaFiltro): Promise<any> {
    let params;
    let headers = new HttpHeaders({ 'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==' });
    params = new HttpParams({ fromObject: { page: filtro.pagina.toString(), size: filtro.itensPorPagina.toString() } });
    if (filtro.nome) {
      params = new HttpParams().set('nome', filtro.nome);
    }
    return await this.httpClient.get(`${this.pessoasUrl}`, { headers, params: params })
    .toPromise()
    .then(res => {
      const pessoas = res.content
      const responseJson = res;
      const resultado = {
        pessoas,
        total: responseJson.totalElements,
      }
      return resultado;
    });
}
}