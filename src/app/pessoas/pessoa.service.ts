import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PessoaFiltro } from '../models/pessoa-filtro';
import { Pessoa } from '../models/pessoa';


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
      .then((res: any) => {
        const pessoas = res.content
        const responseJson = res;
        const resultado = {
          pessoas,
          total: responseJson.totalElements,
        }
        return resultado;
      });
  }

  public excluir(id: number): Promise<void> {
    let headers = new HttpHeaders({ 'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==' });
    return this.httpClient
      .delete(`${this.pessoasUrl}/${id}`, { headers })
      .toPromise().then(() => null);
  }


  public mudarStatus(id: number, status: boolean): Promise<any> {
    let headers = new HttpHeaders({
      'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==',
      "Content-Type": "application/json",
    });

    return this.httpClient.put(`${this.pessoasUrl}/${id}/ativo`, status, { headers }).toPromise().then(null);
  }

  public listarTodas(): Promise<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==' });
    return this.httpClient.get(this.pessoasUrl, { headers }).toPromise();
  }

  public adicionar(pessoa: Pessoa): Promise<Pessoa> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers = headers.append('Content-Type', 'application/json');
    return this.httpClient.post<Pessoa>(this.pessoasUrl, pessoa, { headers }).toPromise();

  }

  public atualizar(pessoa: Pessoa): Promise<Pessoa> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers = headers.append('Content-Type', 'application/json');
    return this.httpClient.put<Pessoa>(`${this.pessoasUrl}/${pessoa.id}`, pessoa, { headers }).toPromise();
  }


  public buscarPorId(id: number): Promise<Pessoa> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers = headers.append('Content-Type', 'application/json');
    return this.httpClient.get<Pessoa>(`${this.pessoasUrl}/${id}`, { headers })
      .toPromise();
  }
}
