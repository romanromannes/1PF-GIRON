import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Student } from 'src/app/core/models/student';
import { StudentsService } from 'src/app/core/services/students.service';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss'],
})
export class StudentsTableComponent {
  displayedColumns = ['id', 'firstName', 'lastName', 'email', 'options'];
  data: Student[] = [];
  dataSource = new MatTableDataSource(this.data);

  constructor(private studentsService: StudentsService) {
    this.studentsService.getStudents().subscribe((students) => {
      this.dataSource = new MatTableDataSource(students);
    });
  }

  delete(id: string): void {
    this.studentsService.deleteStudent(id);
  }
}
