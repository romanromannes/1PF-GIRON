import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from 'src/app/core/models/course';
import { getFakeId } from 'src/app/core/models/data-fake';
import { Inscription } from 'src/app/core/models/inscription';
import { Student } from 'src/app/core/models/student';
import { MainService } from 'src/app/core/services/main.service';
import { StudentsService } from 'src/app/core/services/students.service';

@Component({
  selector: 'app-inscriptions-add',
  templateUrl: './inscriptions-add.component.html',
  styleUrls: ['./inscriptions-add.component.scss'],
})
export class InscriptionsAddComponent {
  form: FormGroup;
  courses: Course[] = [];
  students: Student[] = [];
  courseIdSelected: string = '';
  studentIdSelected: string = '';
  constructor(
    private mainService: MainService,
    private studentsService: StudentsService,
    private router: Router,
    fb: FormBuilder
  ) {
    this.mainService.getAppState().subscribe((x) => {
      this.courses = x.courses;
    });

    this.studentsService.getStudents().subscribe((students) => {
      this.students = students;
    });

    this.form = fb.group({
      studentId: [this.studentIdSelected, Validators.compose([Validators.required])],
      courseId: [this.courseIdSelected, Validators.compose([Validators.required])],
    });
  }

  submit(form: FormGroup): void {
    let inscription: Inscription = {
      id: getFakeId(),
      courseId: form.value.courseId,
      studentId: form.value.studentId,
    };

    this.mainService.addInscription(inscription);

    this.form.reset;

    this.router.navigate(['/inscriptions']);
  }
}
