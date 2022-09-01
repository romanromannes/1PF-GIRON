import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Course } from 'src/app/core/models/course';
import { MainService } from 'src/app/core/services/main.service';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss'],
})
export class CoursesTableComponent {
  displayedColumns = ['id', 'name', 'options'];
  data: Course[] = [];
  dataSource = new MatTableDataSource(this.data);

  constructor(private coursesService: MainService) {
    this.coursesService.getAppState().subscribe((x) => {
      this.dataSource = new MatTableDataSource(x.courses);
      return x.courses;
    });
  }

  delete(id: string): void {
    this.coursesService.deleteCourse(id);
  }
}
