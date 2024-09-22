import {Component, Input} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-generic-success-modal',
  standalone: true,
  imports: [],
  templateUrl: './generic-success-modal.component.html',
  styleUrl: './generic-success-modal.component.css'
})
export class GenericSuccessModalComponent {

  @Input()
  message: string;

  constructor(private bsModalRef: BsModalRef) {
  }

  closeModal() {
    this.bsModalRef.hide();
  }
}
