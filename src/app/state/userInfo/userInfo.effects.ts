import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {HttpClient, HttpParams} from "@angular/common/http";
import {
  ChangeEmailAction,
  ChangePasswordAction,
  ChangeUsernameAction,
  FetchUserInfoAction, UploadProfilePictureAction,
  UserInfoActionFinished
} from "./userInfo.actions";
import {catchError, exhaustMap, map, of, switchMap} from "rxjs";
import {environment} from "../../../environments/environment";
import {GenericSuccessResponse} from "../../shared/generic/generic-success-response";
import {GenericFailedAction, GenericSuccessAction} from "../shared/shared.actions";
import {LoginFinishAction, LogoutAction} from "../auth/auth.actions";

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

  changeUsernameEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(ChangeUsernameAction),
      switchMap((actionProps) => {
        let queryParams = new HttpParams()
          .set('newUsername', actionProps.newUsername);

        return this.httpClient.post<GenericSuccessResponse<Map<String, Object>>>(`${environment.baseUrL}/userInfo/changeUsername`, {}, {params: queryParams})
          .pipe(
            exhaustMap((response) => {
              return [
                GenericSuccessAction({message: "Username successfully changed"}),
                LogoutAction()
              ]
            }),
            catchError((error) => {
              return of(GenericFailedAction({message: "Error changing username"}));
            })
          )
      })
    )
  )

  changePasswordEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(ChangePasswordAction),
      switchMap((actionProps) => {
        return this.httpClient.post<GenericSuccessResponse<Map<String, Object>>>(`${environment.baseUrL}/userInfo/changePassword`, {
          "currentPassword": actionProps.currentPassword,
          "newPassword": actionProps.newPassword
        }).pipe(
          exhaustMap((response) => {
            return [
              GenericSuccessAction({message: "Password successfully changed"}),
              LogoutAction()
            ]
          }),
          catchError((error) => {
            return of(GenericFailedAction({message: "Error changing password"}));
          })
        )
      })
    ))

  changeEmailEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(ChangeEmailAction),
      switchMap((actionProps) => {
        let queryParams = new HttpParams()
          .set('newEmail', actionProps.newEmail);
        return this.httpClient.post<GenericSuccessResponse<Map<String, Object>>>(`${environment.baseUrL}/userInfo/changeEmail`, {}, {params: queryParams}).pipe(
          exhaustMap((response) => {
            return [
              GenericSuccessAction({message: "Email successfully changed"}),
              LogoutAction()
            ]
          }),
          catchError((error) => {
            return of(GenericFailedAction({message: "Error changing email"}));
          })
        )
      })
    ))


  uploadProfilePictureEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(UploadProfilePictureAction),
      switchMap(actionProps => {
        let formData = new FormData()
        formData.append('file', actionProps.profileImageFile)
        return this.httpClient.post<GenericSuccessResponse<Map<String, Object>>>(`${environment.baseUrL}/userInfo/profilePicture`, formData,
          {
            headers: {'Content-Type': 'multipart/form-data; boundary=--------------------------'}
          }
        ).pipe(
          exhaustMap(response => {
            let successAction = response ?
              GenericSuccessAction({message: "Success upload profile image"}) :
              GenericFailedAction({message: "Error occurred while uploading image"})
            return [
              successAction
              //TODO: dispatch action to fetch the new image and set into store
            ]
          }),
          catchError((error) => {
            return of(GenericFailedAction({message: "Error occurred while uploading image"}));
          })
        )
      })
    )
  )
}
