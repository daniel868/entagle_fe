import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {HttpClient} from "@angular/common/http";
import {FetchUserInfoAction} from "./userInfo.actions";
import {switchMap} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable()
export class UserInfoEffects {
  private actions$ = inject(Actions);

  constructor(private httpClient: HttpClient) {
  }

  fetchUserInfoEffects = createEffect(() =>
    this.actions$.pipe(
      ofType(FetchUserInfoAction),
      switchMap((action) => {
        return this.httpClient.get(`${environment.baseUrL}/userInfo`)
      })
    ), {dispatch: false})
}
