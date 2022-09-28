import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import { AuthState } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>(
  fromAuth.authFeatureKey
);

export const selectSessionUser = createSelector(
  selectAuthState,
  (state: AuthState) => {
    if(state == undefined) {
      let session = {id: '', userName: '', pass: '', profile: ''}
      return session;
    }
    return state.sessionUser;
  }
);

export const selectSessionUserLoader = createSelector(
  selectAuthState,
  (state: AuthState) => state.load
);

export const selectSessionUserErrorMsg = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);
