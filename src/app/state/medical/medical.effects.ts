import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {HttpClient, HttpParams} from "@angular/common/http";
import {FetchUserDiseaseAction, UserDiseaseAction} from "./medical.action";
import {map, switchMap} from "rxjs";
import {PageableGenericResponse} from "../../shared/pageable/pageable-generic-response";
import {Disease} from "../../model/disease";
import {environment} from "../../../environments/environment";

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
          .set('size', actionProps.pagination.size);
        return this.httpClient.get<PageableGenericResponse<Disease>>(`${environment.baseUrL}/medical/diseaseTreatments`, {params: queryParams})
          .pipe(
            map(diseaseResponse => {
              return UserDiseaseAction({disease: diseaseResponse});
            })
          )
      })
    )
  )
}
