import {authReducer, AuthState} from "./auth/auth.reducer";
import {ActionReducerMap} from "@ngrx/store";
import {userInfoReducer, UserInfoState} from "./userInfo/userinfo.reducer";

export interface AppState {
  auth: AuthState;
  userInfo: UserInfoState
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: authReducer,
  userInfo: userInfoReducer
}
