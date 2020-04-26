import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriaUrl= 'http://localhost:8080/categorias'
  constructor(private httpClient: HttpClient) { }

  public listarTodas(): Promise<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==' });

    return  this.httpClient.get(this.categoriaUrl, {headers}).toPromise();
  }
}
