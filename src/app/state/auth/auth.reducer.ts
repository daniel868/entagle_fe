import {createReducer, on} from "@ngrx/store";
import {LoginFinishAction, LogoutAction, RegisterFinishAction, RegisterStartAction} from "./auth.actions";

export interface AuthState {
  user: string | null;
  token: string | null;
  loading: boolean;
  accountActivate: boolean;
  email: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  token: null,
  accountActivate: false,
  email: null
}

export const authReducer = createReducer(
  initialState,
  on(LoginFinishAction, (state, {token, username, accountActivate, userEmail}) => {
    console.log("Login reducer called");
    return {
      ...state,
      user: username,
      token: token,
      accountActivate: accountActivate,
      email: userEmail
    };
  }),
  on(RegisterFinishAction, (state, {token, username, accountActivate, userEmail}) => {
    console.log("register reducer called with params: " + token + " " + username);
    return {
      ...state,
      user: username,
      token: token,
      accountActivate: accountActivate,
      email: userEmail
    };
  }),
  on(LogoutAction, (state) => {
    return {
      ...state,
      user: null,
      token: null,
      email: null,
      accountActivate: false
    }
  })
);
