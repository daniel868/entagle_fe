import {Component} from '@angular/core';
import {NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Mocks} from "../mocks/Mocks";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgTemplateOutlet,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  currentAuthStep: number = 1;

  qualifications: string[] = [];

  competences: string[] = [];

  currentCompetence: string = '';

  selectedQualification: string = 'Choose...';


  protected readonly Mocks = Mocks;

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
}
