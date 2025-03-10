import {createAction, props} from "@ngrx/store";

export const FetchUserInfoAction = createAction('[UserInfo] Fetch User Info')

export const UserInfoActionFinished = createAction('[UserInfo] User Info Action', props<{
  qualification: string[];
  competences: string[];
}>())

export const ChangeUsernameAction = createAction('[UserInfo] Change Username', props<{
  newUsername: string
}>())

export const ChangePasswordAction = createAction('[UserInfo] Change Password', props<{
  newPassword: string,
  currentPassword: string
}>());

export const ChangeEmailAction = createAction('[UserInfo] Change Email', props<{
  newEmail: string
}>());

export const UploadProfilePictureAction = createAction('[UserInfo] Upload Profile Picture', props<{
  profileImageFile: File
}>())

export const FetchProfilePictureAction = createAction('[UserInfo] Fetch Profile Picture');

export const StoreProfilePictureAction = createAction('[UserInfo] Store Profile Picture', props<{
  imageBase64Content: string
}>())
