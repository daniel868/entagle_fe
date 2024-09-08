import {Routes} from '@angular/router';
import {PatientsComponent} from "./patient/patients/patients.component";
import {PatientComponent} from "./patient/patient.component";
import {AuthComponent} from "./auth/auth.component";
import {AuthGuard} from "./auth/auth.guard";
import {MainComponent} from "./main/main.component";

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
  }
];
