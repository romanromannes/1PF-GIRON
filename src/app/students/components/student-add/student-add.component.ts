import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getFakeId } from 'src/app/core/utilities/utilities';
import { Student } from 'src/app/core/models/student';
import { StudentsService } from 'src/app/core/services/students.service';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.scss'],
})
export class StudentAddComponent {
  form: FormGroup;
  constructor(
    private studentsService: StudentsService,
    private router: Router,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  getErrorMessage() {
    if (this.form.value.firstName.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.form.value.lastName.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.form.value.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.form.value.email.hasError('email') ? 'Not a valid email' : '';
  }

  submit(form: FormGroup): void {
    let student: Student = {
      id: getFakeId(),
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
    };

    this.studentsService.addStudent(student);

    this.form.reset();

    this.router.navigate(['/students']);
  }
}
