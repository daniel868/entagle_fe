import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {passwordMatchValidator} from "../../register/password-match-validator";
import {AppState} from "../../../state/app.reducer";
import {Store} from "@ngrx/store";
import {ResetPasswordStep1Component} from "../reset-password-step-1/reset-password-step-1.component";
import {PasswordResetStep2Action} from "../../../state/auth/auth.actions";

@Component({
  selector: 'app-reset-password-step-2',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './reset-password-step-2.component.html',
  styleUrl: './reset-password-step-2.component.css'
})
export class ResetPasswordStep2Component implements OnInit {
  emailToken: string;
  newPassword: string;

  newPasswordForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.emailToken = params['emailToken']
      if (this.emailToken === undefined || this.emailToken === '') {
        this.router.navigate(['/auth'])
      }
    });

    this.newPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required])
    }, {validators: passwordMatchValidator});
  }

  changeCurrentPassword() {
    this.newPassword = this.newPasswordForm.get('password')?.value
    this.store.dispatch(PasswordResetStep2Action(
      {emailToken: this.emailToken, newPassword: this.newPassword}
    ));
  }

  hasControlErrors(controlName: string, targetError: string) {
    return this.newPasswordForm.get(controlName)?.hasError(targetError)
  }
}
