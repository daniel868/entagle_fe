import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {PatientComponent} from "./patient/patient.component";
import {PatientRowComponent} from "./patient/patient-row/patient-row.component";
import {PatientsComponent} from "./patient/patients/patients.component";
import {BsModalRef, BsModalService, ModalModule} from "ngx-bootstrap/modal";
import {BsDropdownConfig} from "ngx-bootstrap/dropdown";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {EffectsModule} from "@ngrx/effects";
import {AuthEffects} from "./state/auth/auth.effects";

function BsDropdownModule() {

}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    PatientComponent,
    PatientRowComponent,
    PatientsComponent,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    BsModalRef,
    BsDropdownConfig,
    BsModalService,
  ]
})
export class AppComponent {
  title = 'entangle-fe';
}
