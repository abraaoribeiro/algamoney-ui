import { NgModule } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRouterModule } from './seguranca-router.module';
import { SharedModule } from 'primeng/components/common/shared';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter(): string {
    return localStorage.getItem('token');
}

@NgModule({
    imports: [
        SegurancaRouterModule,
        SharedModule,
        FormsModule,
        ButtonModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: ['localhost:8080'],
                blacklistedRoutes: ['http://localhost:8080/oauth/token']
            }
        }),
        InputTextModule],
    exports: [],
    declarations: [LoginFormComponent],
    providers: [

    ],
})
export class SegurancaModule { }
