import {Component, Input} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-generic-failed-modal',
  standalone: true,
  imports: [],
  templateUrl: './generic-failed-modal.component.html',
  styleUrl: './generic-failed-modal.component.css'
})
export class GenericFailedModalComponent {


  @Input()
  errorMessage: string;

  constructor(private modalReference: BsModalRef) {
  }

  closeModal() {
    if (this.modalReference) {
      this.modalReference.hide();
    }
  }
}
