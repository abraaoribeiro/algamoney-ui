import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  lacamentoUrl: string;

  constructor(private http: HttpClient) {
    this.lacamentoUrl = `${environment.apiUrl}/lancamentos`;
  }

  lancamentoCategoria():Promise<Array<any>> {
    return this.http.get(`${this.lacamentoUrl}/estatisticas/por-categoria`)
      .toPromise()
      .then(response => response as Array<any>);
  }

  lancamentoPorDia():Promise<Array<any>> {
    return this.http.get(`${this.lacamentoUrl}/estatisticas/por-dia`)
      .toPromise()
      .then(response => response as Array<any>);
  }



}
