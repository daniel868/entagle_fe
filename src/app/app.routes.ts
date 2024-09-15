import {Routes} from '@angular/router';
import {PatientComponent} from "./patient/patient.component";
import {AuthComponent} from "./auth/auth.component";
import {AuthGuard} from "./auth/auth.guard";
import {MainComponent} from "./main/main.component";
import {EmailValidationComponent} from "./auth/email-validation/email-validation.component";
import {EmailValidationAction} from "./state/auth/auth.actions";
import {EmailValidationGuard} from "./auth/email-validation/email-validation.guard";

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
    path: 'add',
    component: PatientComponent
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'email-validation',
    canActivate: [EmailValidationGuard],
    component: EmailValidationComponent,
  }
];
