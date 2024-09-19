import {createReducer, on} from "@ngrx/store";
import {UserInfoActionFinished} from "./userInfo.actions";

export interface UserInfoState {
  qualification: string[] | null
  competences: string[] | null
}

const initialState: UserInfoState = {
  qualification: null,
  competences: null
}

export const userInfoReducer = createReducer(
  initialState,
  on(UserInfoActionFinished, (state, {qualification, competences}) => {
    return {
      ...state,
      qualification: qualification,
      competences: competences
    }
  })
)
