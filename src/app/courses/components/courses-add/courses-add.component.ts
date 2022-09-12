import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from 'src/app/core/models/course';
import { CoursesService } from 'src/app/core/services/courses.service';
import { getFakeId } from 'src/app/core/utilities/utilities';

@Component({
  selector: 'app-courses-add',
  templateUrl: './courses-add.component.html',
  styleUrls: ['./courses-add.component.scss']
})
export class CoursesAddComponent  {
  form: FormGroup;
  constructor(
    private coursesService: CoursesService,
    private router: Router,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      name: ['', Validators.compose([Validators.required])],
    });
  }

  getErrorMessage() {
    if (this.form.value.name.hasError('required')) {
      return 'You must enter a value';
    }
    return;
  }

  submit(form: FormGroup): void {
    let course: Course = {
      id: getFakeId(),
      name: form.value.name,
    };

    this.coursesService.addCourse(course);

    this.form.reset;

    this.router.navigate(['/courses']);
  }
}
