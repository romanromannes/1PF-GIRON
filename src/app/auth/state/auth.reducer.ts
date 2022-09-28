import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState } from './auth.state';

export const authFeatureKey = 'auth';

export const initialState: AuthState = {
  load: false,
  sessionUser: {id: '', userName: '', pass: '', profile: ''},
  error: ''
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.logIn, state => {
    return { ...state, load: true };
  }),
  on(AuthActions.logInSuccess, (state, action) => {
    return {...state, load: false, sessionUser: action.sessionUser}
  }),
  on(AuthActions.logInFailure, (state, action) => {
    return { ...state, load: false, error: action.error };
  }),
  on(AuthActions.logOut, state => {
    return { ...state, load: true };
  }),
  on(AuthActions.logOutSuccess, (state, action) => {
    return {...state, load: false, sessionUser: initialState.sessionUser}
  }),
  on(AuthActions.logInFailure, (state, action) => {
    return { ...state, load: false, error: action.error };
  }),
);
