import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as UsersActions from './users.actions';
import { UsersService } from 'src/app/core/services/users.service';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { Store } from '@ngrx/store';
import { UsersState } from './users.state';

@Injectable()
export class UsersEffects {
  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      concatMap(() =>
        this.usersService.getUsers().pipe(
          map((data: User[]) => UsersActions.loadUsersSuccess({ users: data })),
          catchError((error) => of(UsersActions.loadUsersFailure({ error })))
        )
      )
    );
  });

  deleteUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersActions.deleteUser),
        concatMap((action) =>
          this.usersService.deleteUser(action.id).pipe(
            map((data: User) => {
              //this.store.dispatch(UsersActions.deleteUserSuccess({user: data}))
              return UsersActions.deleteUserSuccess({ user: data });
            }),
            catchError((error) => of(UsersActions.deleteUserFailure({ error })))
          )
        ),
        tap(() => this.router.navigateByUrl('/users'))
      )
  );

  addUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersActions.addUser),
        concatMap((action) =>
          this.usersService.addUser(action.user).pipe(
            map((data: User) => {
              //this.store.dispatch(UsersActions.addUserSuccess({ user: data }));
              return UsersActions.addUserSuccess({ user: data });
            }),
            catchError((error) => of(UsersActions.addUserFailure({ error })))
          )
        ),
        tap(() => this.router.navigateByUrl('/users'))
      )
  );

  editUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersActions.editUser),
        concatMap((action) =>
          this.usersService.editUser(action.user).pipe(
            map((data: User) => {
              //this.store.dispatch(UsersActions.editUserSuccess({ user: data }));
              return UsersActions.editUserSuccess({ user: data });
            }),
            catchError((error) => of(UsersActions.editUserFailure({ error })))
          )
        ),
        tap(() => this.router.navigateByUrl('/users'))
      )
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private usersService: UsersService,
    private store: Store<UsersState>
  ) {}
}
