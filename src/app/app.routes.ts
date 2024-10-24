import {Routes} from '@angular/router';
import {PatientComponent} from "./patient/patient.component";
import {AuthComponent} from "./auth/auth.component";
import {AuthGuard} from "./auth/auth.guard";
import {MainComponent} from "./main/main.component";
import {EmailValidationComponent} from "./auth/email-validation/email-validation.component";
import {EmailValidationAction} from "./state/auth/auth.actions";
import {EmailValidationGuard} from "./auth/email-validation/email-validation.guard";
import {ResetPasswordStep1Component} from "./auth/reset-password/reset-password-step-1/reset-password-step-1.component";
import {ResetPasswordStep2Component} from "./auth/reset-password/reset-password-step-2/reset-password-step-2.component";
import {DiseaseTableComponent} from "./shared/tables/disease-table/disease-table.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    canActivate: [AuthGuard],
    component: MainComponent
  },
  {
    path: 'disease-and-treatments',
    component: DiseaseTableComponent
  },
  // {
  //   path: 'temp',
  //   component: PatientComponent
  // },
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
  }
];
