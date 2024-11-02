import {PageableGenericResponse} from "../../shared/pageable/pageable-generic-response";
import {Disease} from "../../model/disease";
import {createReducer, on} from "@ngrx/store";
import {TreatmentItemAction, UserDiseaseAction} from "./medical.action";
import {TreatmentItem} from "../../model/treatment-item";

export interface MedicalState {
  userDisease: PageableGenericResponse<Disease> | null;
  treatmentItems: TreatmentItem[]
}

const initialState: MedicalState = {
  userDisease: null,
  treatmentItems: []
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
  })
)
