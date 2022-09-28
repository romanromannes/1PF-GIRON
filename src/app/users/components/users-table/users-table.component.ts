import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UsersState } from '../../state/users.state';
import * as UsersActions from '../../state/users.actions';
import { selectUsersErrorMsg, selectUsersList, selectUsersLoader } from '../../state/users.selectors';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent {
  displayedColumns = ['id', 'userName', 'pass', 'profile', 'options'];
  data: User[] = [];
  dataSource = new MatTableDataSource(this.data);
  loader$: Observable<boolean>;
  errorMsg$: Observable<string>;

  constructor(private store:Store<UsersState>) {
    this.store.dispatch(UsersActions.loadUsers())
    this.loader$ = this.store.select(selectUsersLoader);
    this.errorMsg$ = this.store.select(selectUsersErrorMsg);
    this.store.select(selectUsersList)
      .subscribe((x) => {
        this.dataSource = new MatTableDataSource(x);
      });
  }

  delete(id: string): void {
    this.store.dispatch(UsersActions.deleteUser({id: id}));
  }
}
