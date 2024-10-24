import {Component, ElementRef, HostListener, input, ViewChild} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Mocks} from "../mocks/Mocks";
import {Patient} from "../model/patient";
import {Treatment} from "../model/treatment";
import {Router} from "@angular/router";


@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent {

  patientSituations: string[] = ['asthma', 'shoulder tension', 'lower back pain']

  filteredSituation: string[] = []

  filteredCategory: string[] = Mocks.qualification;

  situation: string = ''

  displayAddSituationBtn: boolean = false

  circumstance: string = ''

  treatments: Treatment[] = []

  selectedCategory: string = Mocks.qualification[0];

  showCategoryDropdown: boolean = false;

  constructor(private elementRef: ElementRef,
              private router: Router) {
  }

  /*
  mocks only
   */

  onCategoryChange(newValue: string) {
    this.selectedCategory = newValue;
    this.showCategoryDropdown = !this.showCategoryDropdown;
  }

  onSituationDropdownClick(selectedSituation: string) {
    this.situation = selectedSituation
    // this.filteredSituation = []
    this.displayAddSituationBtn = false
  }

  onSituationInputChange(input: string) {
    // this.filteredSituation = []
    this.displayAddSituationBtn = true
    if (input !== '') {
      this.filteredSituation = this.patientSituations.filter((value) => value.toLowerCase().includes(input.toLowerCase()));
    }
    if (input == '' || this.filteredSituation.length !== 0) {
      this.displayAddSituationBtn = false;
    }
  }

  onAddSituationBtnClicked() {
    if (this.situation !== '') {
      this.patientSituations.push(this.situation)
    }
  }

  onAddCircumstanceBtnClicked() {
    if (this.circumstance != '') {
      this.treatments.push(new Treatment(this.selectedCategory, this.circumstance))
      this.filteredCategory = this.filteredCategory.filter((value) => value !== this.selectedCategory)
      this.selectedCategory = this.filteredCategory[0]
    }
    this.circumstance = ''
  }

  onDeleteCircumstanceBtnClicked(value: Treatment) {
    this.treatments = this.treatments.filter((currentValue) => currentValue !== value)
  }

  onSubmit() {
    let patient = new Patient(this.situation, this.treatments);
    Mocks.patients.push(patient)
    this.router.navigate(['/main'])
  }

  onCancel() {

  }

  protected readonly Mocks = Mocks;

  onCategoryBtnClicked() {
    this.showCategoryDropdown = !this.showCategoryDropdown;
  }

  @HostListener('document:click', ['$event'])
  onDocumentEventClick(event: MouseEvent) {
    const target = event.target as HTMLElement
    if (!this.elementRef.nativeElement.contains(target)) {
      this.showCategoryDropdown = false;
    }
  }
}
