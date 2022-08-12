import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from 'src/app/shared/models/course';
import { getfakeId } from 'src/app/shared/models/data-fake';
import { Lesson } from 'src/app/shared/models/lesson';
import { Student } from 'src/app/shared/models/student';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-lessons-add',
  templateUrl: './lessons-add.component.html',
  styleUrls: ['./lessons-add.component.scss'],
})
export class LessonsAddComponent {
  form: FormGroup;
  courses: Course[] = [];
  students: Student[] = [];
  courseIdSelected: string = '';
  studentIdSelected: string = '';
  constructor(
    private mainService: MainService,
    private router: Router,
    fb: FormBuilder
  ) {
    this.mainService.getAppState().subscribe((x) => {
      this.courses = x.courses;
      this.students = x.students;
    });

    this.form = fb.group({
      studentId: [this.studentIdSelected, Validators.compose([Validators.required])],
      courseId: [this.courseIdSelected, Validators.compose([Validators.required])],
    });
  }

  submit(form: FormGroup): void {
    let lesson: Lesson = {
      id: getfakeId(),
      courseId: form.value.courseId,
      studentId: form.value.studentId,
    };

    this.mainService.addLesson(lesson);

    this.form.reset;

    this.router.navigate(['/lessons']);
  }
}
