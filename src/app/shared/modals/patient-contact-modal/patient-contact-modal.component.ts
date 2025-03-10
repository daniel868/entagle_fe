import {Component, Input} from '@angular/core';
import {Patient} from "../../../model/patient";
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-patient-contact-modal',
  standalone: true,
  imports: [],
  templateUrl: './patient-contact-modal.component.html',
  styleUrl: './patient-contact-modal.component.css'
})
export class PatientContactModalComponent {

  @Input()
  patient: Patient;

  constructor(private ref: BsModalRef) {
  }

  closeModal() {
    if (this.ref) {
      this.ref.hide();
    }
  }
}
