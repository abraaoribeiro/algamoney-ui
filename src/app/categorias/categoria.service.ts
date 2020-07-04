import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  categoriaUrl: string;
  constructor(private httpClient: HttpClient) {
    this.categoriaUrl = `${environment.apiUrl}/categorias`;
   }

  public listarTodas(): Promise<any> {

    return  this.httpClient.get(this.categoriaUrl).toPromise();
  }
}
