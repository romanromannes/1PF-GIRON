import { Component } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Student } from 'src/app/shared/models/student';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss'],
})
export class StudentsTableComponent {
  displayedColumns = ['id', 'firstName', 'lastName', 'email', 'options'];
  data: Student[] = [];
  dataSource = new MatTableDataSource(this.data);

  constructor(private mainService: MainService) {
    this.mainService.getAppState().subscribe((x) => {
      this.dataSource = new MatTableDataSource(x.students);
      return x.students;
    });
  }

  delete(id: string): void {
    this.mainService.deleteStudent(id);
  }
}
