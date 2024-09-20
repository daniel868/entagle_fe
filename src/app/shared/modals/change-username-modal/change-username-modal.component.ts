import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-change-username-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './change-username-modal.component.html',
  styleUrl: './change-username-modal.component.css'
})
export class ChangeUsernameModalComponent implements OnInit {

  usernameForm: FormGroup;

  @Output()
  closeEventEmitter = new EventEmitter<boolean>()

  ngOnInit(): void {
    this.usernameForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  changeUsername() {

  }

  closeModal() {
    console.log("close modal called");
    this.closeEventEmitter.emit(true);
  }

}
