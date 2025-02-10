import {Component, Input} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-patient-situation-modal',
  standalone: true,
  imports: [],
  templateUrl: './patient-situation-modal.component.html',
  styleUrl: './patient-situation-modal.component.css'
})
export class PatientSituationModalComponent {

  @Input()
  patientSituation: string

  constructor(private bsModalRef: BsModalRef) {
  }

  closeModal() {
    if (this.bsModalRef) {
      this.bsModalRef.hide()
    }
  }
}
