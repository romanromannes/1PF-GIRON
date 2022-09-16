import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/core/models/auth';

export const loadUsers = createAction(
  '[Users] Load Users'
);

export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ data: User[] }>()
);

export const loadUsersFailure = createAction(
  '[Users] Load Users Failure',
  props<{ error: string }>()
);

export const addUser = createAction(
  '[Users] Add User'
);

export const addUserSuccess = createAction(
  '[Users] Add User Success',
  props<{ data: User }>()
);

export const addUserFailure = createAction(
  '[Users] Add User Failure',
  props<{ error: string }>()
);

export const deleteUser = createAction(
  '[Users] Delete User'
);

export const deleteUserSuccess = createAction(
  '[Users] Delete User Success',
  props<{ data: User }>()
);

export const deleteUserFailure = createAction(
  '[Users] Delete User Failure',
  props<{ error: string }>()
);

export const editUser = createAction(
  '[Users] Edit User'
);

export const editUserSuccess = createAction(
  '[Users] Edit User Success',
  props<{ data: User }>()
);

export const editUserFailure = createAction(
  '[Users] Edit User Failure',
  props<{ error: string }>()
);


