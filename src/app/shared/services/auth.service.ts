import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { UserAuth } from '../models/user-auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userAuth$ = new BehaviorSubject<UserAuth>({
    userName: '',
    pass: '',
    profile: '',
    islogin: false,
  });

  constructor() {}

  getUserAuth(): Observable<UserAuth> {
    return this.userAuth$.asObservable();
  }

  login(user: UserAuth): boolean {
    this.userAuth$.next(user);
    return true;
  }

  logout() {
    this.userAuth$.next({
      userName: '',
      pass: '',
      profile: '',
      islogin: false,
    });
  }
}
