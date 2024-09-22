import {createAction, props} from "@ngrx/store";

export const LoginStartAction = createAction('[AUTH] Login Start', props<{
  username: string,
  password: string
}>())
export const LoginFinishAction = createAction('[AUTH] Login Finish', props<{
  token: string,
  username: string,
  expirationDate: Date,
  accountActivate: boolean,
  userEmail: string
}>())

export const RegisterStartAction = createAction('[Auth] Register Start', props<{
  username: string,
  password: string,
  email: string,
  qualification: string[],
  competences: string[],
}>());

export const RegisterFinishAction = createAction('[Auth] Register Finish', props<{
  token: string,
  username: string,
  accountActivate: boolean,
  userEmail: string
}>())

export const EmailValidationAction = createAction('[Auth] Email Validation', props<{
  emailToken: string
}>())

export const PasswordResetStep1 = createAction('[Auth] Password Reset Step1',
  props<{ emailAddress: string }>()
);

export const PasswordResetStep2Action = createAction('[Auth] Password Reset Step2',
  props<{ emailToken: string; newPassword: string }>()
);

export const LogoutAction = createAction('[Auth] Logout Action')

export const AutoLoginAction = createAction('[Auth] AutoLogin Action')
