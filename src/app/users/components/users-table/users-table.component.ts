import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { delay } from 'rxjs';
import { User } from 'src/app/core/models/auth';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent {
  displayedColumns = ['id', 'userName', 'pass', 'profile', 'options'];
  data: User[] = [];
  dataSource = new MatTableDataSource(this.data);
  loading: boolean;

  constructor(private usersService: UsersService) {
    this.loading = true;
    this.usersService
      .getUsers()
      .pipe(delay(3000))
      .subscribe((x) => {
        this.dataSource = new MatTableDataSource(x);
        this.loading = false;
      });
  }

  delete(id: string): void {
    this.usersService.deleteUser(id);
  }
}
