import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from 'src/app/shared/models/course';
import { getfakeId } from 'src/app/shared/models/data-fake';
import { Inscription } from 'src/app/shared/models/inscription';
import { Student } from 'src/app/shared/models/student';
import { MainService } from 'src/app/shared/services/main.service';

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
    let inscription: Inscription = {
      id: getfakeId(),
      courseId: form.value.courseId,
      studentId: form.value.studentId,
    };

    this.mainService.addInscription(inscription);

    this.form.reset;

    this.router.navigate(['/inscriptions']);
  }
}
