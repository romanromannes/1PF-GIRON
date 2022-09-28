import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsers from './users.reducer';
import { UsersState } from './users.state';

export const selectUsersState = createFeatureSelector<UsersState>(
  fromUsers.usersFeatureKey
);

export const selectUsersList = createSelector(
  selectUsersState,
  (state: UsersState) => state.users
);

export const selectUsersLoader = createSelector(
  selectUsersState,
  (state: UsersState) => state.load
);

export const selectUsersErrorMsg= createSelector(
  selectUsersState,
  (state: UsersState) => state.error
);