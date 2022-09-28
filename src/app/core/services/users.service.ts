import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users`);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.url}/users/${id}`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/users`, user);
  }

  editUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/users/${user.id}`, user);
  }
}
