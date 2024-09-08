import {createReducer, on} from "@ngrx/store";
import {LoginFinishAction, RegisterFinishAction} from "./auth.actions";

export interface AuthState {
  user: string | null;
  token: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  token: null
}

export const authReducer = createReducer(
  initialState,
  on(LoginFinishAction, (state, {token, username}) => {
    console.log("Login reducer called");
    return {
      ...state,
      user: username,
      token: token
    };
  }),
  on(RegisterFinishAction, (state, {token, username}) => {
    console.log("register reducer called with params: " + token + " " + username);
    return {
      ...state,
      user: username,
      token: token
    };
  })
);
