import {createAction, props} from "@ngrx/store";

export const LoginStartAction = createAction('[AUTH] Login Start', props<{
  username: string,
  password: string
}>())
export const LoginFinishAction = createAction('[AUTH] Login Finish', props<{
  token: string,
  username:string
}>())

export const RegisterStartAction = createAction('[Auth] Register Start', props<{
  username: string,
  password: string,
  email: string,
  qualification: string[],
  competences: string[]
}>());

export const RegisterFinishAction = createAction('[Auth] Register Finish', props<{
  token: string,
  username:string
}>())
