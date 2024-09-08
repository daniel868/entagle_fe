import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {LoginFinishAction, LoginStartAction, RegisterFinishAction, RegisterStartAction} from "./auth.actions";
import {map, switchMap, tap} from "rxjs";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);

  constructor(private httpClient: HttpClient,
              private router: Router
  ) {
  }

  loginEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginStartAction),
      tap(() => console.log("login effect called")),
      switchMap((action) => {
        return this.httpClient.post<{ token: string, username: string }>(`${environment.baseUrL}/auth/login`, {
          username: action.username,
          password: action.password
        })
      }),
      map(response => {
        return LoginFinishAction({token: response.token, username: response.username})
      })
    )
  )

  registerEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(RegisterStartAction),
      tap(() => console.log("register effect called")),
      switchMap((action) => {
        return this.httpClient.post<{ token: string, username: string }>(`${environment.baseUrL}/auth/register`, {
          email: action.email,
          username: action.username,
          password: action.password,
          qualification: action.qualification,
          competences: action.competences
        })
      }),
      map((response) => {
        return RegisterFinishAction({token: response.token, username: response.username});
      })
    )
  )

  registerSuccessEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(RegisterFinishAction),
      tap((action) => {
        this.router.navigate(['/'])
      })
    ), {dispatch: false})

  loginSuccessEffect = createEffect(() =>
      this.actions$.pipe(
        ofType(LoginFinishAction),
        tap((action) => {
          this.router.navigate(['/'])
        })
      ),
    {dispatch: false}
  )

}
