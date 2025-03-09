import {createReducer, on} from "@ngrx/store";
import {StoreProfilePictureAction, UserInfoActionFinished} from "./userInfo.actions";

export interface UserInfoState {
  qualification: string[] | null
  competences: string[] | null
  profileImage: string | null
}

const initialState: UserInfoState = {
  qualification: null,
  competences: null,
  profileImage: null
}

export const userInfoReducer = createReducer(
  initialState,
  on(UserInfoActionFinished, (state, {qualification, competences}) => {
    return {
      ...state,
      qualification: qualification,
      competences: competences
    }
  }),
  on(StoreProfilePictureAction, (state, {imageBase64Content}) => {
    return {
      ...state,
      profileImage: imageBase64Content
    }
  })
)
