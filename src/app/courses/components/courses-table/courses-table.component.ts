import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Course } from 'src/app/core/models/course';
import { CoursesService } from 'src/app/core/services/courses.service';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss'],
})
export class CoursesTableComponent {
  displayedColumns = ['id', 'name', 'options'];
  data: Course[] = [];
  dataSource = new MatTableDataSource(this.data);

  constructor(private coursesService: CoursesService) {
    this.coursesService.getCourses().subscribe((x) => {
      this.dataSource = new MatTableDataSource(x);
    });
  }

  delete(id: string): void {
    this.coursesService.deleteCourse(id);
  }
}
