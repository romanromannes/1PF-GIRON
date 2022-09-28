import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { LogIn, SessionUser, SignUp } from '../models/auth';
import { User } from '../models/user';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private usersService: UsersService) {}

  logIn(logIn: LogIn): Observable<SessionUser> {
    return this.usersService.getUsers().pipe(
      map((users) => {
        let user = users.filter(
          (u) => u.userName === logIn.userName && u.pass === logIn.pass
        )[0];

        if (!user) {
          throw new Error('User not found');
        }

        return {
          id: user.id,
          userName: user.userName,
          pass: user.pass,
          profile: user.profile,
        };
      })
    );
  }

  signUp(signUp: SignUp): Observable<User> {
    let user: User = {
      id: '',
      userName: signUp.userName,
      pass: signUp.pass,
      profile: 'user',
    };
    return this.usersService.addUser(user);
  }

  logOut(): Observable<boolean> {
    return of(true);
  }
}
