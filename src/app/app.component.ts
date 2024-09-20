import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {PatientComponent} from "./patient/patient.component";
import {PatientRowComponent} from "./patient/patient-row/patient-row.component";
import {PatientsComponent} from "./patient/patients/patients.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {BsDropdownConfig} from "ngx-bootstrap/dropdown";
import {AppState} from "./state/app.reducer";
import {Store} from "@ngrx/store";
import {AutoLoginAction} from "./state/auth/auth.actions";
import {NgIf} from "@angular/common";

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
    RouterLinkActive, NgIf,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    BsModalRef,
    BsDropdownConfig,
    BsModalService,
  ]
})
export class AppComponent implements OnInit {
  title = 'entangle-fe';
  isAuthenticated: boolean = false;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.select('auth')
      .pipe()
      .subscribe(user => {
        this.isAuthenticated = !!user && user.accountActivate;
    });

    this.store.dispatch(AutoLoginAction());

  }

}
