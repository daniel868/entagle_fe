import {createAction, props} from "@ngrx/store";

export const FetchUserInfoAction = createAction('[UserInfo] Fetch User Info')

export const UserInfoActionFinished = createAction('[UserInfo] User Info Action', props<{
  qualification: string[];
  competences: string[];
}>())
