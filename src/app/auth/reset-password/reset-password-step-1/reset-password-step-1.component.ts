import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {AppState} from "../../../state/app.reducer";
import {Store} from "@ngrx/store";
import {PasswordResetStep1} from "../../../state/auth/auth.actions";

@Component({
  selector: 'app-reset-password-step-1',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './reset-password-step-1.component.html',
  styleUrl: './reset-password-step-1.component.css'
})
export class ResetPasswordStep1Component implements OnInit {

  resetPasswordEmailForm: FormGroup;
  emailAddress: string;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.resetPasswordEmailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });

  }

  submitResetForm() {
    this.emailAddress = this.resetPasswordEmailForm.get('email')?.value
    this.store.dispatch(PasswordResetStep1({emailAddress: this.emailAddress}));
  }

  hasControlErrors(controlName: string, targetError: string) {
    return this.resetPasswordEmailForm.get(controlName)?.hasError(targetError)
  }
}
