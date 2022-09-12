import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login, User } from '../models/auth';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url: string = environment.url;
  private users$ = new BehaviorSubject<User[]>([]);
  private sessionUser$ = new BehaviorSubject<User>({
    id: '',
    userName: '',
    pass: '',
    profile: '',
    islogin: false,
  });

  constructor(private http: HttpClient) {
    let usersFromDb: User[];
    this.http.get<User[]>(`${this.url}/users`).subscribe((users) => {
      usersFromDb = users.map((user: User) => {
        return {
          id: user.id,
          userName: user.userName,
          pass: user.pass,
          profile: 'user',
          islogin: false,
        };
      });

      usersFromDb = [
        {
          id: '000',
          userName: 'admin',
          pass: 'admin',
          profile: 'admin',
          islogin: false,
        },
        {
          id: '001',
          userName: 'user',
          pass: 'user',
          profile: 'user',
          islogin: false,
        },
        ...usersFromDb,
      ];

      this.users$.next(usersFromDb);
    });
  }

  getSessiontUser(): Observable<User> {
    return this.sessionUser$.asObservable();
  }

  signin(data: Login): void {
    const user: User = {
      id: '',
      userName: data.userName,
      pass: data.pass,
      profile: 'user',
      islogin: false,
    };

    this.http.post<User>(`${this.url}/users`, user).subscribe((x) => {
      this.users$.next([...this.users$.getValue(), x]);
    });
  }

  login(login: Login): boolean {
    const userFromDb = this.users$
      .getValue()
      .find((x) => x.userName.trim() === login.userName.trim());

    if (userFromDb == null || userFromDb.pass !== login.pass) {
      return false;
    }

    this.sessionUser$.next({
      id: userFromDb.id,
      userName: userFromDb.userName,
      pass: userFromDb.pass,
      profile: userFromDb.profile,
      islogin: true,
    });
    return true;
  }

  logout() {
    this.sessionUser$.next({
      id: '',
      userName: '',
      pass: '',
      profile: '',
      islogin: false,
    });

    localStorage.removeItem('user');
  }

  // Users CRUD
  getUsers(): Observable<User[]> {
    return this.users$.asObservable();
  }

  deleteUser(id: string): void {
    this.http.delete<User>(`${this.url}/users/${id}`).subscribe(
      (user) => {
        this.users$.next(this.users$.getValue().filter((x) => x.id !== id));
      },
      (err) => throwError(() => new Error(err))
    );
  }

  addUser(user: User): void {
    this.http
      .post<User>(`${this.url}/users`, user)
      .pipe(
        catchError((err) => {
          throw err;
        })
      )
      .subscribe({
        next: (user) => {
          this.users$.next([...this.users$.getValue(), user]);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  getUserById(id: string): User {
    return this.users$.getValue().filter((x) => x.id === id)[0];
  }

  editUser(user: User): void {
    this.http.put<User>(`${this.url}/users/${user.id}`, user).subscribe((x) => {
      this.users$.next([
        x,
        ...this.users$.getValue().filter((x) => x.id !== user.id),
      ]);
    });
  }
}
