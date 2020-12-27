import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Pessoa } from '../models/pessoa';
import { Cidade } from './../models/cidade';
import { Estado } from './../models/estado';
import { PessoaFiltro } from '../models/pessoa-filtro';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  pessoasUrl: string;
  cidadesUrl: string;
  estadoUrl: string;

  constructor(private httpClient: HttpClient) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`
    this.cidadesUrl = `${environment.apiUrl}/cidades`
    this.estadoUrl = `${environment.apiUrl}/estados`
  }

  public async pesquisar(filtro: PessoaFiltro): Promise<any> {
    let params;
    params = new HttpParams({ fromObject: { page: filtro.pagina.toString(), size: filtro.itensPorPagina.toString() } });
    if (filtro.nome) {
      params = new HttpParams().set('nome', filtro.nome);
    }
    return await this.httpClient.get(`${this.pessoasUrl}`, { params: params })
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
    return this.httpClient.delete(`${this.pessoasUrl}/${id}`).toPromise().then(() => null);
  }


  public mudarStatus(id: number, status: boolean): Promise<any> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');

    return this.httpClient.put(`${this.pessoasUrl}/${id}/ativo`, status, {headers: headers}).toPromise().then(null);
  }

  public listarTodas(): Promise<any> {
    return this.httpClient.get(this.pessoasUrl).toPromise();
  }

  public adicionar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');
    return this.httpClient.post<Pessoa>(this.pessoasUrl, pessoa,{headers:headers}).toPromise();

  }

  public atualizar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');
    return this.httpClient.put<Pessoa>(`${this.pessoasUrl}/${pessoa.id}`, pessoa, {headers: headers}).toPromise();
  }


  public buscarPorId(id: number): Promise<Pessoa> {
    return this.httpClient.get<Pessoa>(`${this.pessoasUrl}/${id}`).toPromise();
  }

  public listarEstados(): Promise<Estado[]> {
    return this.httpClient.get<Estado[]>(this.estadoUrl).toPromise();
  }

  public pesquisarCidades(estadoId): Promise<Cidade[]> {
    let params = new HttpParams().set('estadoId', estadoId);
    return this.httpClient.get<Cidade[]>(this.cidadesUrl, { params: params }).toPromise();
  }
}
