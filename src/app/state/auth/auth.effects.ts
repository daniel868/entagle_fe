import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  AutoLoginAction, EmailValidationAction,
  LoginFinishAction,
  LoginStartAction,
  LogoutAction, PasswordResetStep1, PasswordResetStep2Action,
  RegisterFinishAction,
  RegisterStartAction
} from "./auth.actions";
import {catchError, map, of, switchMap, tap, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {GenericFailedAction, GenericSuccessAction} from "../shared/shared.actions";

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);

  constructor(private httpClient: HttpClient,
              private router: Router,
              private authService: AuthService
  ) {
  }

  loginEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginStartAction),
      tap(() => console.log("login effect called")),
      switchMap((action) => {
        return this.httpClient.post<{
          token: string,
          username: string,
          expiresInSecond: number,
          accountActivate: boolean,
          userEmail: string
        }>(`${environment.baseUrL}/auth/login`, {
          username: action.username,
          password: action.password
        }).pipe(
          map(response => {
            const expirationDate = new Date(new Date().getTime() + (response.expiresInSecond * 1000));

            const user = {
              "username": response.username,
              "token": response.token,
              "expirationDate": expirationDate,
              "accountActivate": response.accountActivate,
              "userEmail": response.userEmail
            }

            this.authService.setLogoutTimer(response.expiresInSecond * 1000);

            localStorage.setItem('userData', JSON.stringify(user));


            return LoginFinishAction({
              token: response.token,
              username: response.username,
              expirationDate: expirationDate,
              accountActivate: response.accountActivate,
              userEmail: response.userEmail
            });
          }),
          catchError((error) => {
            console.log("Error: " + JSON.stringify(error));
            return of(GenericFailedAction({message: "Invalid username or password"}))
          })
        )
      })
    )
  )

  registerEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(RegisterStartAction),
      tap(() => console.log("register effect called")),
      switchMap((action) => {
        return this.httpClient.post<{
          token: string,
          username: string,
          expiresInSecond: number,
          accountActivate: boolean,
          userEmail: string
        }>(`${environment.baseUrL}/auth/register`, {
          email: action.email,
          username: action.username,
          password: action.password,
          qualification: action.qualification,
          competences: action.competences
        })
      }),
      map((action) => {

        const expirationDate = new Date(new Date().getTime() + (action.expiresInSecond * 1000));
        const user = {
          "username": action.username,
          "token": action.token,
          "expirationDate": expirationDate,
          "accountActivate": action.accountActivate,
          "userEmail": action.userEmail
        }

        this.authService.setLogoutTimer(action.expiresInSecond * 1000);

        localStorage.setItem('userData', JSON.stringify(user));
        return RegisterFinishAction({
          token: action.token,
          username: action.username,
          accountActivate: action.accountActivate,
          userEmail: action.userEmail
        });
      })
    )
  )

  registerSuccessEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(RegisterFinishAction),
      tap((action) => {
        if (action.token) {
          this.router.navigate(['/email-validation'],
            // {queryParams: {oauth: true}, queryParamsHandling: "merge"}
          )
        }
      })
    ), {dispatch: false})

  loginSuccessEffect = createEffect(() =>
      this.actions$.pipe(
        ofType(LoginFinishAction),
        tap((action) => {
          if (action.accountActivate) {
            this.router.navigate(['/app/main'])
          } else {
            this.router.navigate(['/email-validation']
            )
          }
        })
      ),
    {dispatch: false}
  )


  autoLoginEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(AutoLoginAction),
      map((action) => {
        let userData = localStorage.getItem('userData');
        const parseUserData: {
          username: string,
          token: string,
          expirationDate: string,
          accountActivate: boolean,
          userEmail: string
        } = userData !== null ? JSON.parse(userData) : null;


        if (parseUserData != null) {
          const remainExpirationDateTime = new Date(parseUserData.expirationDate).getTime() - new Date().getTime();
          this.authService.setLogoutTimer(remainExpirationDateTime);
          if (parseUserData.accountActivate) {
            return LoginFinishAction({
              token: parseUserData.token,
              username: parseUserData.username,
              expirationDate: new Date(parseUserData.expirationDate),
              accountActivate: parseUserData.accountActivate,
              userEmail: parseUserData.userEmail
            });
          }
        }
        return {type: "dummy"};
      })
    )
  )

  logoutEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(LogoutAction),
      tap((action) => {
        this.authService.clearTimeout();
        localStorage.removeItem('userData');
        this.router.navigate(['/app/auth'])
      })
    ), {dispatch: false})


  emailValidationEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(EmailValidationAction),
      switchMap((action) => {
        let queryParams = new HttpParams().set('token', action.emailToken);
        return this.httpClient.post<{
          token: string,
          username: string,
          expiresInSecond: number,
          accountActivate: boolean,
          userEmail: string,
        }>(`${environment.baseUrL}/auth/activate`, {emailToken: action.emailToken})
      }),
      map((response) => {
        const expirationDate = new Date(new Date().getTime() + (response.expiresInSecond * 1000));

        const user = {
          "username": response.username,
          "token": response.token,
          "expirationDate": expirationDate,
          "accountActivate": response.accountActivate,
          "userEmail": response.userEmail
        }

        this.authService.setLogoutTimer(response.expiresInSecond * 1000);

        localStorage.setItem('userData', JSON.stringify(user));


        return LoginFinishAction({
          token: response.token,
          username: response.username,
          expirationDate: expirationDate,
          accountActivate: response.accountActivate,
          userEmail: response.userEmail
        });
      })
    ));

  passwordResetStep1Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(PasswordResetStep1),
      switchMap((action) => {
        return this.httpClient.post<{ emailSend: boolean }>(`${environment.baseUrL}/auth/sendResetPasswordLink`, {}, {
          params: new HttpParams().append('emailAddress', action.emailAddress)
        });
      }),
      map((response) => {
        return GenericSuccessAction({message: 'Email successfully sent'});
      })
    ))

  passwordResetStep2Effect = createEffect(() =>
    this.actions$.pipe(
      ofType(PasswordResetStep2Action),
      switchMap((action) => {
        return this.httpClient.post<{ passwordChanged: boolean }>(`${environment.baseUrL}/auth/resetAccountPassword`,
          {
            emailToken: action.emailToken,
            newPassword: action.newPassword
          }).pipe(
          tap((response) => {
            if (response.passwordChanged) {
              this.router.navigate(['/auth'])
            }
          }),
          map((response: { passwordChanged: boolean }) => {
            if (response.passwordChanged) {
              return GenericSuccessAction({message: "Password successfully changed"});
            }
            return GenericFailedAction({message: "Error occurred while changing password. Try again later!"});
          }),
          catchError((error) => {
            return of(GenericFailedAction({message: "Error occurred while changing password. Try again later!"}))
          })
        )
      })
    )
  )
}
