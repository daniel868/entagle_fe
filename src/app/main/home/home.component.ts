import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AppState} from "../../state/app.reducer";
import {Store} from "@ngrx/store";
import {InitializeNewContactRequest} from "../../state/medical/medical.action";
import {HeroSectionsComponent} from "../landing/hero-sections/hero-sections.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HeroSectionsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  intakeForm: FormGroup;


  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.intakeForm = new FormGroup({
      currentSituation: new FormControl('', [Validators.required]),
      contactInfo: new FormControl('', [Validators.required]),
      contactNameAndSurname: new FormControl('', [Validators.required])
    });

  }

  submitPatientSituation() {
    this.store.dispatch(InitializeNewContactRequest({
      patientSituation: this.intakeForm.get('currentSituation')?.value,
      patientContactInfo: this.intakeForm.get('contactInfo')?.value,
      patientName: this.intakeForm.get('contactNameAndSurname')?.value
    }))
  }

}
