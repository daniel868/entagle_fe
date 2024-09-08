import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {Mocks} from "../../mocks/Mocks";
import {Store} from "@ngrx/store";
import {AppState} from "../../state/app.reducer";
import {RegisterStartAction} from "../../state/auth/auth.actions";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    NgTemplateOutlet
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

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

  constructor(private store: Store<AppState>) {
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
      console.log(this.qualifications);
      console.log(this.competences);

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
