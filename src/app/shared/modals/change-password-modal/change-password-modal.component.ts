import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {passwordMatchValidator} from "../../../auth/register/password-match-validator";
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-change-password-modal',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './change-password-modal.component.html',
  styleUrl: './change-password-modal.component.css'
})
export class ChangePasswordModalComponent implements OnInit {

  newPasswordForm: FormGroup;

  constructor(private modalRef: BsModalRef) {
  }

  ngOnInit(): void {
    this.newPasswordForm = new FormGroup({
      currentPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required])
    }, {validators: passwordMatchValidator});

  }

  changeCurrentPassword() {
  }

  hasControlErrors(controlName: string, targetError: string) {
    return this.newPasswordForm.get(controlName)?.hasError(targetError)
  }

  closeModal() {
    if (this.modalRef){
      this.modalRef.hide();
    }
  }
}