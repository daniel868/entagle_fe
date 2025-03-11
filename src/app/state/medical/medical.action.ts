import {createAction, props} from "@ngrx/store";
import {Pageable} from "../../shared/pageable/pageable";
import {PageableGenericResponse} from "../../shared/pageable/pageable-generic-response";
import {Disease} from "../../model/disease";
import {TreatmentItem} from "../../model/treatment-item";
import {GenericSuccessResponse} from "../../shared/generic/generic-success-response";
import {MedicalNote} from "../../model/notes";

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
  patientName: string
}>())

export const UpdateTreatmentItemAction = createAction('[Medical] Update Treatment Item', props<{
  treatmentId: number,
  items: TreatmentItem[]
}>())

export const AddNewMedicalNoteAction = createAction('[Medical] Add New Medical Action', props<{
  diseaseId: number,
  note: MedicalNote
}>())

export const FetchMedicalNotesAction = createAction('[Medical] Fetch Medical Notes Action', props<{
  diseaseId: number
}>())

export const StoreMedicalNotesAction = createAction('[Medical] Store Medical Notes Action', props<{
  notes: MedicalNote[]
}>())
