import {PageableGenericResponse} from "../../shared/pageable/pageable-generic-response";
import {Disease} from "../../model/disease";
import {createReducer, on} from "@ngrx/store";
import {StoreMedicalNotesAction, TreatmentItemAction, UserDiseaseAction} from "./medical.action";
import {TreatmentItem} from "../../model/treatment-item";
import {MedicalNote} from "../../model/notes";

export interface MedicalState {
  userDisease: PageableGenericResponse<Disease> | null;
  treatmentItems: TreatmentItem[],
  medicalNotes: MedicalNote[] | null;
}

const initialState: MedicalState = {
  userDisease: null,
  treatmentItems: [],
  medicalNotes: []
}

export const medicalReducer = createReducer(
  initialState,
  on(UserDiseaseAction, (state, {disease}) => {
    return {
      ...state,
      userDisease: disease
    }
  }),
  on(TreatmentItemAction, (state, {items}) => {
    return {
      ...state,
      treatmentItems: items.payload
    }
  }),
  on(StoreMedicalNotesAction, (state, {notes}) => {
    return {
      ...state,
      medicalNotes: notes
    }
  })
)
