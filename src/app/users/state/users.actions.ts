import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/core/models/user';

export const loadUsers = createAction('[Users] Load Users');

export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  '[Users] Load Users Failure',
  props<{ error: string }>()
);

export const addUser = createAction(
  '[Users] Add User',
  props<{ user: User }>()
);

export const addUserSuccess = createAction(
  '[Users] Add User Success',
  props<{ user: User }>()
);

export const addUserFailure = createAction(
  '[Users] Add User Failure',
  props<{ error: string }>()
);

export const deleteUser = createAction(
  '[Users] Delete User',
  props<{ id: string }>()
);

export const deleteUserSuccess = createAction(
  '[Users] Delete User Success',
  props<{ user: User }>()
);

export const deleteUserFailure = createAction(
  '[Users] Delete User Failure',
  props<{ error: string }>()
);

export const editUser = createAction(
  '[Users] Edit User',
  props<{ user: User }>()
);

export const editUserSuccess = createAction(
  '[Users] Edit User Success',
  props<{ user: User }>()
);

export const editUserFailure = createAction(
  '[Users] Edit User Failure',
  props<{ error: string }>()
);
