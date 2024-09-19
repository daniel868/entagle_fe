import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  AutoLoginAction, EmailValidationAction,
  LoginFinishAction,
  LoginStartAction,
  LogoutAction,
  RegisterFinishAction,
  RegisterStartAction
} from "./auth.actions";
import {map, switchMap, tap} from "rxjs";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";

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
        })
      }),
      map(action => {
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


        return LoginFinishAction({
          token: action.token,
          username: action.username,
          expirationDate: expirationDate,
          accountActivate: action.accountActivate,
          userEmail: action.userEmail
        });

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
            this.router.navigate(['/'])
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

        console.log("Userdata from cache: " + JSON.stringify(parseUserData));

        if (parseUserData != null) {
          const remainExpirationDateTime = new Date(parseUserData.expirationDate).getTime() - new Date().getTime();
          console.log("Remain seconds: " + (remainExpirationDateTime / 1000));
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
        this.router.navigate(['/auth'])
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
    ))
}
