import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {BsModalRef} from "ngx-bootstrap/modal";
import {AppState} from "../../../state/app.reducer";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-change-email-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './change-email-modal.component.html',
  styleUrl: './change-email-modal.component.css'
})
export class ChangeEmailModalComponent implements OnInit {

  emailForm: FormGroup;


  constructor(private modalReference: BsModalRef,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.emailForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
    });
  }


  changeEmail() {

  }

  closeModal() {
    if (this.modalReference) {
      this.modalReference.hide();
    }
  }
}
