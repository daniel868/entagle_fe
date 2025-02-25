import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InitializeNewContactRequest} from "../../state/medical/medical.action";
import {Store} from "@ngrx/store";
import {AppState} from "../../state/app.reducer";

@Component({
  selector: 'app-intake',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './intake.component.html',
  styleUrl: './intake.component.css'
})
export class IntakeComponent implements OnInit {

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
