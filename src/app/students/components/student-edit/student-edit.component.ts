import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Student } from 'src/app/shared/models/student';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss'],
})
export class StudentEditComponent {
  form: FormGroup;
  paramId: string = '';

  constructor(
    private mainService: MainService,
    private router: Router,
    private route: ActivatedRoute,
    fb: FormBuilder
  ) {
    this.getParamId();
    const student: Student = mainService.getStudentById(this.paramId);
    this.form = fb.group({
      id: [student.id],
      firstName: [student.firstName, Validators.compose([Validators.required])],
      lastName: [student.lastName, Validators.compose([Validators.required])],
      email: [
        student.email,
        Validators.compose([Validators.required, Validators.email]),
      ],
    });
  }

  getParamId(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.paramId = params.get('id') ?? '';
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
      id: form.value.id,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
    };

    this.mainService.editStudent(student);

    this.form.reset;

    this.router.navigate(['/students']);
  }
}
