import {Component, Input} from '@angular/core';

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
}
