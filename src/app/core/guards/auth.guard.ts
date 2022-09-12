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
import { map, Observable } from 'rxjs';
import { User } from '../models/auth';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private usersService: UsersService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.usersService.getSessiontUser().pipe(
      map((sessionUser: User) => {
        //console.log('auth canActivate', sessionUser);
        if (!sessionUser.islogin) {
          this.router.navigate(['/auth/login']);
          return false;
        }
        return true;
      })
    );
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.usersService.getSessiontUser().pipe(
      map((sessionUser: User) => {
        //console.log('auth canLoad', sessionUser);
        if (!sessionUser.islogin) {
          this.router.navigate(['/auth/login']);
          return false;
        }
        return true;
      })
    );
  }
}
