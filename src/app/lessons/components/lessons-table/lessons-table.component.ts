import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LessonVM } from 'src/app/shared/models/lesson';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-lessons-table',
  templateUrl: './lessons-table.component.html',
  styleUrls: ['./lessons-table.component.scss'],
})
export class LessonsTableComponent {
  displayedColumns = ['id', 'course', 'student', 'options'];
  data: LessonVM[] = [];
  dataSource = new MatTableDataSource(this.data);

  constructor(private mainService: MainService) {
    this.mainService.getAppState().subscribe((x) => {
      let lessonsVM: LessonVM[] = x.lessons.map((l) => {
        const students = x.students.filter((z) => z.id == l.studentId);
        const courses = x.courses.filter((z) => z.id == l.courseId);
        return {
          id: l.id,
          course: courses[0],
          student: students[0],
        };
      });
      this.dataSource = new MatTableDataSource(lessonsVM);
    });
  }

  delete(id: string): void {
    this.mainService.deleteLesson(id);
  }
}
