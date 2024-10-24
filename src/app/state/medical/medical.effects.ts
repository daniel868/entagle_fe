import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {HttpClient, HttpParams} from "@angular/common/http";
import {
  AddNewDiseaseAction,
  AddNewTreatmentAction,
  DeleteDiseaseAction,
  FetchUserDiseaseAction,
  UserDiseaseAction
} from "./medical.action";
import {catchError, exhaustMap, map, of, switchMap} from "rxjs";
import {PageableGenericResponse} from "../../shared/pageable/pageable-generic-response";
import {Disease} from "../../model/disease";
import {environment} from "../../../environments/environment";
import {GenericSuccessResponse} from "../../shared/generic/generic-success-response";
import {GenericFailedAction, GenericSuccessAction} from "../shared/shared.actions";

@Injectable()
export class MedicalEffects {
  private actions$ = inject(Actions);

  constructor(private httpClient: HttpClient) {
  }

  fetchUserDiseaseTreatment = createEffect(() =>
    this.actions$.pipe(
      ofType(FetchUserDiseaseAction),
      switchMap((actionProps) => {
        let queryParams = new HttpParams()
          .set('page', actionProps.pagination.page)
          .set('size', actionProps.pagination.size)
          .set('searchString', actionProps.searchString);
        return this.httpClient.get<PageableGenericResponse<Disease>>(`${environment.baseUrL}/medical/diseaseTreatments`, {params: queryParams})
          .pipe(
            map(diseaseResponse => {
              return UserDiseaseAction({disease: diseaseResponse});
            })
          )
      })
    )
  )

  addNewTreatmentEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(AddNewTreatmentAction),
      switchMap((actionProps) => {
        return this.httpClient.post<GenericSuccessResponse<Map<string, boolean>>>(`${environment.baseUrL}/medical/addTreatment/${actionProps.diseaseId}`,
          actionProps.treatmentItems
        ).pipe(
          exhaustMap((response) => {
            return [
              GenericSuccessAction({message: "Success saved treatment"}),
              FetchUserDiseaseAction({pagination: {page: 1, size: 10}, searchString: ''})
            ]
          }),
          catchError((error) => {
            return of(GenericFailedAction({message: "Error saved treatment"}));
          })
        )
      })
    ))

  addNewDiseaseEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(AddNewDiseaseAction),
      switchMap((actionProps) => {
        return this.httpClient.post<GenericSuccessResponse<Map<string, boolean>>>(`${environment.baseUrL}/medical/disease`,
          {
            "items": actionProps.treatmentItems,
            "diseaseName": actionProps.diseaseName
          }
        ).pipe(
          exhaustMap((response) => {
            return [
              GenericSuccessAction({message: "Success saved disease"}),
              FetchUserDiseaseAction({pagination: {page: 1, size: 10}, searchString: ''})
            ]
          }),
          catchError((error) => {
            return of(GenericFailedAction({message: "Error saved disease"}));
          })
        )
      })
    ))

  deleteDiseaseEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteDiseaseAction),
      switchMap((actionProps) => {
        return this.httpClient.delete<GenericSuccessResponse<Map<String, Boolean>>>(`${environment.baseUrL}/medical/disease/${actionProps.diseaseId}`)
          .pipe(
            exhaustMap(response => {
              return [
                GenericSuccessAction({message: "Success deleted disease"}),
                FetchUserDiseaseAction({pagination: {page: 1, size: 10}, searchString: ''})
              ]
            })
          )
      }),
      catchError(err => {
        return of(GenericFailedAction({message: "Error deleted disease"}));
      })
    )
  )
}
