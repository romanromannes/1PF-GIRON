import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AuthActions from './auth.actions';
import { AuthService } from 'src/app/core/services/auth.service';
import { SessionUser } from 'src/app/core/models/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from './auth.state';

@Injectable()
export class AuthEffects {
  logIn$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logIn),
        concatMap((action) =>
          this.authService.logIn(action.logIn).pipe(
            map((data: SessionUser) => {
              // this.store.dispatch(
              //   AuthActions.logInSuccess({ sessionUser: data })
              // );
              return AuthActions.logInSuccess({ sessionUser: data });
            }),
            catchError((error) => of(AuthActions.logInFailure({ error })))
          )
        ),
        tap(() => this.router.navigateByUrl('/home'))
      )
  );

  logOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logOut),
        concatMap(() =>
          this.authService.logOut().pipe(
            map((data) => {
              return AuthActions.logOutSuccess();
            }),
            catchError((error) => of(AuthActions.logInFailure({ error })))
          )
        ),
        tap(() => this.router.navigateByUrl('/auth/login'))
      )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store<AuthState>
  ) {}
}
