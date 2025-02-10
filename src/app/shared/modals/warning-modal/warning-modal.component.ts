import {Component, Input, Output} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-warning-modal',
  standalone: true,
  imports: [],
  templateUrl: './warning-modal.component.html',
  styleUrl: './warning-modal.component.css'
})
export class WarningModalComponent {

  @Input()
  message: string;

  @Input()
  confirmClickAction: () => void;

  constructor(private bsModalRef: BsModalRef) {
  }

  closeModal() {
    this.bsModalRef.hide();
  }


  confirmAction() {
    this.confirmClickAction();
    this.closeModal();
  }
}
