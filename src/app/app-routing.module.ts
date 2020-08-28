import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './core/nao-autorizado.component';



const routes: Routes = [
  { path: 'lancamentos', loadChildren: 'src/app/lancamentos/lancamentos.module#LancamentosModule' },
  { path: 'pessoas', loadChildren: 'src/app/pessoas/pessoas.module#PessoasModule' },
  { path: 'dashboard', loadChildren: 'src/app/dashboard/dashboard.module#DashboardModule' },
  { path: 'relatorios', loadChildren: 'src/app/relatorios/relatorios.module#RelatoriosModule' },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
