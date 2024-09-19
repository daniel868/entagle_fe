import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {HttpClient} from "@angular/common/http";
import {FetchUserInfoAction, UserInfoActionFinished} from "./userInfo.actions";
import {map, switchMap} from "rxjs";
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
        return this.httpClient.get<{
          competences: string[],
          qualification: string[]
        }>(`${environment.baseUrL}/userInfo`)
      }),
      map((response) => {
        return UserInfoActionFinished({qualification: response.qualification, competences: response.competences})
      })
    ))
}
