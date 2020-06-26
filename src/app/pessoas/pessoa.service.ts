import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa } from '../models/pessoa';
import { PessoaFiltro } from '../models/pessoa-filtro';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  pessoasUrl:string;

  constructor(private httpClient: HttpClient) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`
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
    return this.httpClient.put(`${this.pessoasUrl}/${id}/ativo`, status).toPromise().then(null);
  }

  public listarTodas(): Promise<any> {
    return this.httpClient.get(this.pessoasUrl).toPromise();
  }

  public adicionar(pessoa: Pessoa): Promise<Pessoa> {
    return this.httpClient.post<Pessoa>(this.pessoasUrl, pessoa).toPromise();

  }

  public atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return this.httpClient.put<Pessoa>(`${this.pessoasUrl}/${pessoa.id}`, pessoa).toPromise();
  }


  public buscarPorId(id: number): Promise<Pessoa> {
    return this.httpClient.get<Pessoa>(`${this.pessoasUrl}/${id}`).toPromise();
  }
}
