import {createAction, props} from "@ngrx/store";
import {Pageable} from "../../shared/pageable/pageable";
import {PageableGenericResponse} from "../../shared/pageable/pageable-generic-response";
import {Disease} from "../../model/disease";
import {TreatmentItem} from "../../model/treatment-item";
import {GenericSuccessResponse} from "../../shared/generic/generic-success-response";

export const FetchUserDiseaseAction = createAction('[Medical] Fetch User Disease', props<{
  pagination: Pageable,
  searchString: string
}>())

export const UserDiseaseAction = createAction('[Medical] User Disease', props<{
  disease: PageableGenericResponse<Disease>
}>());

export const AddNewTreatmentAction = createAction('[Medical] Add New Treatment', props<{
  diseaseId: number,
  treatmentItems: TreatmentItem[]
}>())

export const AddNewDiseaseAction = createAction('[Medical] Add New Disease', props<{
  treatmentItems: TreatmentItem[],
  diseaseName: string
}>())

export const DeleteDiseaseAction = createAction('[Medical] Delete Disease', props<{ diseaseId: number }>())


export const FetchTreatmentItemAction = createAction('[Medical] Fetch Treatment Item', props<{
  searchString: string
}>())

export const TreatmentItemAction = createAction('[Medical] Treatment Item', props<{
  items: GenericSuccessResponse<TreatmentItem[]>
}>())

export const InitializeNewContactRequest = createAction('[Medical] Initialize New Contact Request', props<{
  patientSituation: string,
  patientContactInfo: string,
  patientName:string
}>())
