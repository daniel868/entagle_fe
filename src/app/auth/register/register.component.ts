import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {Mocks} from "../../mocks/Mocks";
import {Store} from "@ngrx/store";
import {AppState} from "../../state/app.reducer";
import {RegisterStartAction} from "../../state/auth/auth.actions";
import {passwordMatchValidator} from "./password-match-validator";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    NgTemplateOutlet,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  currentAuthStep: number = 1;

  qualifications: string[] = [];

  competences: string[] = [];

  currentCompetence: string = '';

  selectedQualification: string = 'Choose...';

  username: string;
  password: string;
  email: string;

  @Output()
  loginEventEmitter = new EventEmitter<boolean>();

  //forms
  registerForm: FormGroup;

  constructor(private store: Store<AppState>,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required])
    }, {validators: passwordMatchValidator})
  }

  hasControlErrors(controlName: string, targetError: string) {
    return this.registerForm.get(controlName)?.hasError(targetError)
  }


  onQualificationAdd() {
    let value = this.qualifications.find(value => {
      return value === this.selectedQualification
    }) || null;

    if (value == null) {
      this.qualifications.push(this.selectedQualification);
    }
  }

  onQualificationChange(newValue: string) {
    this.selectedQualification = newValue;
  }

  onCompetenceAdd() {
    if (this.currentCompetence !== '') {
      this.competences.push(this.currentCompetence);
      this.currentCompetence = '';
    }
  }

  onNextClicked() {
    if (this.currentAuthStep == 3) {

      this.username = this.registerForm.get('username')?.value
      this.password = this.registerForm.get('password')?.value
      this.email = this.registerForm.get('email')?.value

      this.store.dispatch(
        RegisterStartAction({
          username: this.username,
          password: this.password,
          email: this.email,
          qualification: this.qualifications,
          competences: this.competences
        })
      );
      return;
    }
    this.currentAuthStep++;
  }

  onCancelClicked() {
    if (this.currentAuthStep == 1) {
      return;
    }
    this.currentAuthStep--;
  }

  onLoginBtnClicked() {
    this.loginEventEmitter.emit(false);
  }

  protected readonly Mocks = Mocks;
}
