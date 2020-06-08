import { NgModule } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRouterModule } from './seguranca-router.module';
import { SharedModule } from 'primeng/components/common/shared';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';



@NgModule({
    imports: [
        SegurancaRouterModule, 
        SharedModule, 
        FormsModule, 
        ButtonModule, 
        InputTextModule],
    exports: [],
    declarations: [LoginFormComponent],
    providers: [],
})
export class SegurancaModule { }
