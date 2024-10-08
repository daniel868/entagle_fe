import {authReducer, AuthState} from "./auth/auth.reducer";
import {ActionReducerMap} from "@ngrx/store";
import {userInfoReducer, UserInfoState} from "./userInfo/userinfo.reducer";
import {medicalReducer, MedicalState} from "./medical/medical.reducer";

export interface AppState {
  auth: AuthState;
  userInfo: UserInfoState;
  medical: MedicalState;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: authReducer,
  userInfo: userInfoReducer,
  medical: medicalReducer
}
