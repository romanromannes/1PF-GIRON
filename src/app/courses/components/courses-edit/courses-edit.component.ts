import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Course } from 'src/app/core/models/course';
import { MainService } from 'src/app/core/services/main.service';

@Component({
  selector: 'app-courses-edit',
  templateUrl: './courses-edit.component.html',
  styleUrls: ['./courses-edit.component.scss'],
})
export class CoursesEditComponent {
  form: FormGroup;
  paramId: string = '';

  constructor(
    private mainService: MainService,
    private router: Router,
    private route: ActivatedRoute,
    fb: FormBuilder
  ) {
    this.getParamId();
    const course: Course = mainService.getCoursesById(this.paramId);
    this.form = fb.group({
      id: [course.id],
      name: [course.name, Validators.compose([Validators.required])],
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
    return;
  }

  submit(form: FormGroup): void {
    let course: Course = {
      id: form.value.id,
      name: form.value.name,
    };

    this.mainService.editCourse(course);

    this.form.reset;

    this.router.navigate(['/courses']);
  }
}
