import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getFakeId } from 'src/app/core/utilities/utilities';
import { Inscription } from 'src/app/core/models/inscription';
import { InscriptionsService } from 'src/app/core/services/inscriptions.service';

@Component({
  selector: 'app-inscriptions-add',
  templateUrl: './inscriptions-add.component.html',
  styleUrls: ['./inscriptions-add.component.scss'],
})
export class InscriptionsAddComponent {
  form: FormGroup;
  inscriptions: Inscription[] = [];
  courseSelected: string = '';
  studentSelected: string = '';
  students$;
  courses$;
  constructor(
    private inscriptionsService: InscriptionsService,
    private router: Router,
    fb: FormBuilder
  ) {
    this.students$ = inscriptionsService.getStudents();
    this.courses$ = inscriptionsService.getCourses();
    this.form = fb.group({
      student: [this.studentSelected, Validators.compose([Validators.required])],
      course: [this.courseSelected, Validators.compose([Validators.required])],
    });
  }

  submit(form: FormGroup): void {
    let inscription: Inscription = {
      id: getFakeId(),
      course: form.value.course,
      student: form.value.student,
    };

    this.inscriptionsService.addInscription(inscription);

    this.form.reset;

    this.router.navigate(['/inscriptions']);
  }
}
