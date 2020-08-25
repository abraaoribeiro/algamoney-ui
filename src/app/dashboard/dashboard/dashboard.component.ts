import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pieChartData: any;
  lineChartData: any;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.configurarGraficoPizza();
    this.configurarGraficoLinha();
  }

  configurarGraficoPizza() {
    this.dashboardService.lancamentoCategoria()
      .then(data => {
        this.pieChartData = {
          labels: data.map(data => data.categoria.nome),
          datasets: [
            {
              data: data.map(data => data.total),
              backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6',
                '#DD4477', '#3366CC', '#DC3912']
            }
          ]
        };
      })
  }

  configurarGraficoLinha() {
    this.dashboardService.lancamentoPorDia().then(data => {
      const diasMes = this.configurarDiaMes();
      const totaisReceitas = this.totaisPorCadaDiaMes(
        data.filter(lancamento => lancamento.tipo === 'RECEITA')
        , diasMes);

      const totaisDespesas = this.totaisPorCadaDiaMes(
        data.filter(lancamento => lancamento.tipo === 'DESPESAS')
        , diasMes);

      this.lineChartData = {
        labels: diasMes,
        datasets: [
          {
            label: 'Receitas',
            data: totaisReceitas,
            borderColor: '#3366CC'
          }, {
            label: 'Despesas',
            data: totaisDespesas,
            borderColor: '#D62B00'
          }
        ]
      };
    })
  }

  private totaisPorCadaDiaMes(dados: any[], diasDoMes: any[]) {
    const totais: number[] = [];

    for (const dia of diasDoMes) {
      let total = 0;
      for (const dado of dados) {

        if (dado.dia.getDate() === dia) {
          total = dado.total;
          break;
        }
      }
      totais.push(total);
    }
    return totais;
  }

  private configurarDiaMes() {
    const mesReferencia = new Date();
    mesReferencia.setMonth(mesReferencia.getMonth() + 1);
    mesReferencia.setDate(0);

    const quantidade = mesReferencia.getDate();

    const dias: number[] = [];

    for (let i = 1; i <= quantidade; i++) {
      dias.push(i);
    }
    return dias;
  }

}
