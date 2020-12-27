import { CommonModule, registerLocaleData } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import  localePt from '@angular/common/locales/pt'
import { ToastModule } from 'primeng/toast';

registerLocaleData(localePt);
@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  exports: [
    NavbarComponent,
    ToastModule,
    ConfirmDialogModule,
  ],
  imports: [
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
    RouterModule
  ],
  providers: [
    ConfirmationService,
    MessageService,
    { provide: LOCALE_ID, useValue: 'pt' }
  ]
})
export class CoreModule { }
