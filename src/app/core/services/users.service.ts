import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login, User } from '../models/auth';
import { getFakeId } from '../models/data-fake';

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

  signin(data: Login): boolean {
    const user: User = {
      id: getFakeId(),
      userName: data.userName,
      pass: data.pass,
      profile: 'user',
      islogin: false,
    };

    this.users$.next([...this.users$.getValue(), user]);
    return true;
  }

  login(login: Login): boolean {
    const userFromDb = this.users$.getValue().find(
      (x) => x.userName.trim() === login.userName.trim()
    );

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
    const users = this.users$.getValue().filter((x) => x.id !== id);
    this.users$.next(users);
  }

  addUser(user: User): void {
    const users = this.users$.getValue();
    const data = [...users, user];
    this.users$.next(data);
  }

  getUserById(id: string): User {
    return this.users$.getValue().filter((x) => x.id === id)[0];
  }

  editUser(user: User): void {
    const users = this.users$.getValue().filter((x) => x.id !== user.id);
    this.users$.next([user, ...users]);
  }
}
