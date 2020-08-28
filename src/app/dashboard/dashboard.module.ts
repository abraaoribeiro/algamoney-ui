import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { ChartModule } from 'primeng/chart'
import { PanelModule } from 'primeng/panel'
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,

    PanelModule,
    ChartModule,
    DashboardRoutingModule,
    SharedModule
  ],
  providers:[DecimalPipe]
})
export class DashboardModule { }
