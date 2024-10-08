import {createAction, props} from "@ngrx/store";
import {Pageable} from "../../shared/pageable/pageable";
import {PageableGenericResponse} from "../../shared/pageable/pageable-generic-response";
import {Disease} from "../../model/disease";

export const FetchUserDiseaseAction = createAction('[Medical] Fetch User Disease', props<{ pagination: Pageable }>())

export const UserDiseaseAction = createAction('[Medical] User Disease', props<{
  disease: PageableGenericResponse<Disease>
}>());
