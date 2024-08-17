import {Routes} from '@angular/router';
import {PatientsComponent} from "./patient/patients/patients.component";
import {PatientComponent} from "./patient/patient.component";
import {AuthComponent} from "./auth/auth.component";
import {AuthGuard} from "./auth/auth.guard";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    canActivate: [AuthGuard],
    component: PatientsComponent
  },
  {
    path: 'add',
    component: PatientComponent
  },
  {
    path: 'login',
    component: AuthComponent
  }
];
