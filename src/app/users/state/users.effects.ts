import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as UsersActions from './users.actions';


@Injectable()
export class UsersEffects {

  loadUserss$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(UsersActions.loadUsers),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => UsersActions.loadUsersSuccess({ data })),
          catchError(error => of(UsersActions.loadUsersFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
