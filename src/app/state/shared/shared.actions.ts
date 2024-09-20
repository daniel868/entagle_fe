import {createAction, props} from "@ngrx/store";

export const GenericSuccessAction = createAction('[Generic] Success Action', props<{
  message: string
}>())
