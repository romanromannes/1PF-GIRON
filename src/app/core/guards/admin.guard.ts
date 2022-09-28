import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectSessionUser } from 'src/app/auth/state/auth.selectors';
import { AuthState } from 'src/app/auth/state/auth.state';
import { SessionUser } from '../models/auth';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate, CanLoad {
  constructor(private store: Store<AuthState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.select(selectSessionUser).pipe(
      map((sessionUser: SessionUser) => {
        if (sessionUser.profile.toUpperCase() !== 'ADMIN') {
          this.router.navigate(['/home']);
          return false;
        }
        return true;
      })
    );
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.store.select(selectSessionUser).pipe(
      map((sessionUser: SessionUser) => {
        if (sessionUser.profile.toUpperCase() !== 'ADMIN') {
          this.router.navigate(['/home']);
          return false;
        }
        return true;
      })
    );
  }
}
