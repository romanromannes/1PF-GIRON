import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Course } from 'src/app/shared/models/course';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss'],
})
export class CoursesTableComponent {
  displayedColumns = ['id', 'name', 'options'];
  data: Course[] = [];
  dataSource = new MatTableDataSource(this.data);

  constructor(private mainService: MainService) {
    this.mainService.getAppState().subscribe((x) => {
      this.dataSource = new MatTableDataSource(x.courses);
      return x.courses;
    });
  }

  delete(id: string): void {
    this.mainService.deleteCourse(id);
  }
}
