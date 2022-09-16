import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import * as UsersActions from './users.actions';
import { UsersState } from './usersState';

export const usersFeatureKey = 'users';

export const initialState: UsersState = {
  load: false,
  users: [],
  error: '',
};

export const reducer = createReducer(
  initialState,
  on(UsersActions.loadUsers, (state: UsersState) => {
    return { ...state, load: true };
  }),
  on(UsersActions.loadUsersSuccess, (state, action) => {
    return { ...state, load: false, users: action.data };
  }),
  on(UsersActions.loadUsersFailure, (state, action) => {
    return { ...state, load: false, error: action.error };
  }),
  on(UsersActions.addUser, (state: UsersState) => {
    return { ...state, load: true };
  }),
  on(UsersActions.addUserSuccess, (state, action) => {
    return { ...state, load: false, users: [...state.users, action.data] };
  }),
  on(UsersActions.addUserFailure, (state, action) => {
    return { ...state, load: false, error: action.error };
  }),
  on(UsersActions.deleteUser, (state: UsersState) => {
    return { ...state, load: true };
  }),
  on(UsersActions.deleteUserSuccess, (state, action) => {
    return {
      ...state,
      load: false,
      users: [...state.users.filter((x) => x.id !== action.data.id)],
    };
  }),
  on(UsersActions.deleteUserFailure, (state, action) => {
    return { ...state, load: false, error: action.error };
  }),
  on(UsersActions.editUser, (state: UsersState) => {
    return { ...state, load: true };
  }),
  on(UsersActions.editUserSuccess, (state, action) => {
    return {
      ...state,
      load: false,
      users: [
        ...state.users.filter((x) => x.id !== action.data.id),
        action.data,
      ],
    };
  }),
  on(UsersActions.editUserFailure, (state, action) => {
    return { ...state, load: false, error: action.error };
  })
);
