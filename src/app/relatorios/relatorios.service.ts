import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  lacamentoUrl: string;
  constructor(private http: HttpClient) {
    this.lacamentoUrl = `${environment.apiUrl}/lancamentos`;
  }

  reltorioLancamentoPorPessoa(inicio: Date, fim: Date) {
    let params = new HttpParams();

    params = params.set('inicio', moment(inicio).format('YYYY-MM-DD'));
    params = params.set('fim', moment(fim).format('YYYY-MM-DD'));

    return this.http.get(`${this.lacamentoUrl}/relatorios/por-pessoa`,
      { params, responseType: 'blob' })
      .toPromise().then(respose => respose);
  }
}
