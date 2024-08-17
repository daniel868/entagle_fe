import {Component, ElementRef, HostListener, Inject, Input, TemplateRef, ViewChild} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {BsModalService} from "ngx-bootstrap/modal";
import {Mocks} from "../../mocks/Mocks";
import {Treatment} from "../../model/treatment";

@Component({
  selector: 'app-patient-row',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './patient-row.component.html',
  styleUrl: './patient-row.component.css'
})
export class PatientRowComponent {

  @Input()
  situation: string = 'Situation 1';

  @Input()
  treatments: Treatment[];

  dropdownOpen: boolean = false

  @ViewChild('patientModal')
  patientModalTemplate: TemplateRef<any>


  constructor(private elementRef: ElementRef,
              private modalService: BsModalService) {
  }


  @HostListener('document:click', ['$event'])
  onDocumentEventClick(event: MouseEvent) {
    const target = event.target as HTMLElement
    if (!this.elementRef.nativeElement.contains(target)) {
      this.dropdownOpen = false;
    }
  }


  onToggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen
  }

  onPatientDetailsClick() {
    this.onToggleDropdown();
    this.modalService.show(this.patientModalTemplate);
  }

  onPatientDetailsClose() {
    this.modalService.hide();
  }

  onPatientDetailsUpdate() {
    this.modalService.hide()
  }
}
