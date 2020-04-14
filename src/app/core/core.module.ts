import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToastyModule } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NavbarComponent } from './navbar/navbar.component';
@NgModule({
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule,
  ],
  imports: [
    CommonModule,
    ToastyModule.forRoot(),
    ConfirmDialogModule,
  ],
  providers: [
    ConfirmationService,
    // {provide:LOCALE_ID, useValue: 'pt-BR'}
  ]
})
export class CoreModule { }
