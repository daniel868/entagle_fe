import {Routes} from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {AuthGuard} from "./auth/auth.guard";
import {MainComponent} from "./main/main.component";
import {EmailValidationComponent} from "./auth/email-validation/email-validation.component";
import {EmailValidationAction} from "./state/auth/auth.actions";
import {EmailValidationGuard} from "./auth/email-validation/email-validation.guard";
import {ResetPasswordStep1Component} from "./auth/reset-password/reset-password-step-1/reset-password-step-1.component";
import {ResetPasswordStep2Component} from "./auth/reset-password/reset-password-step-2/reset-password-step-2.component";
import {DiseaseTableComponent} from "./shared/tables/disease-table/disease-table.component";
import {HomeComponent} from "./main/home/home.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'main',
    canActivate: [AuthGuard],
    component: MainComponent
  },
  {
    path: 'disease-and-treatments',
    canActivate: [AuthGuard],
    component: DiseaseTableComponent
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'email-validation',
    canActivate: [EmailValidationGuard],
    component: EmailValidationComponent,
  },
  {
    path: 'reset-password-step1',
    component: ResetPasswordStep1Component
  },
  {
    path: 'reset-password-step2',
    component: ResetPasswordStep2Component
  },
  {
    path: 'home',
    component: HomeComponent
  }
];
