import {PageableGenericResponse} from "../../shared/pageable/pageable-generic-response";
import {Disease} from "../../model/disease";
import {createReducer, on} from "@ngrx/store";
import {UserDiseaseAction} from "./medical.action";

export interface MedicalState {
  userDisease: PageableGenericResponse<Disease> | null;
}

const initialState: MedicalState = {
  userDisease: null
}

export const medicalReducer = createReducer(
  initialState,
  on(UserDiseaseAction, (state, {disease}) => {
    return {
      ...state,
      userDisease: disease
    }
  })
)
