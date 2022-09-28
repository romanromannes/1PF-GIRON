import { createAction, props } from '@ngrx/store';
import { LogIn, SessionUser } from 'src/app/core/models/auth';

export const logIn = createAction('[Auth] LogIn', props<{ logIn: LogIn }>());

export const logInSuccess = createAction(
  '[Auth] LogIn Success',
  props<{ sessionUser: SessionUser }>()
);

export const logInFailure = createAction(
  '[Auth] LogIn Failure',
  props<{ error: string }>()
);

export const logOut = createAction('[Auth] logOut');

export const logOutSuccess = createAction(
  '[Auth] LogOut Success'
);

export const logOutFailure = createAction(
  '[Auth] LogOut Failure',
  props<{ error: string }>()
);


