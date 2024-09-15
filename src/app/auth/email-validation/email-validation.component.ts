import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {AppState} from "../../state/app.reducer";
import {Store} from "@ngrx/store";
import {EmailValidationAction} from "../../state/auth/auth.actions";
import {map, Subscription} from "rxjs";

@Component({
  selector: 'app-email-validation',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './email-validation.component.html',
  styleUrl: './email-validation.component.css'
})
export class EmailValidationComponent implements OnInit, OnDestroy {
  emailToken: string;
  authEmail: string;

  emailSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.emailToken = params['emailToken']
      if (this.emailToken!!) {
        this.store.dispatch(EmailValidationAction({emailToken: this.emailToken}))
      }
    })
    this.emailSubscription = this.store.select('auth')
      .pipe(
        map(authState => {
          return authState.email
        })
      ).subscribe((email) => {
        if (!!email) {
          this.authEmail = email;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.emailSubscription) {
      this.emailSubscription.unsubscribe();
    }
  }


  resendEmail() {

  }

  goToLogin() {
    this.router.navigate(['/auth'])
  }
}
