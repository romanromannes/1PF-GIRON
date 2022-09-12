import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Inscription } from 'src/app/core/models/inscription';
import { InscriptionsService } from 'src/app/core/services/inscriptions.service';

@Component({
  selector: 'app-inscriptions-edit',
  templateUrl: './inscriptions-edit.component.html',
  styleUrls: ['./inscriptions-edit.component.scss']
})
export class InscriptionsEditComponent {

  form: FormGroup;
  inscriptions: Inscription[] = [];
  students$;
  courses$;
  paramId: string = '';
  constructor(
    private inscriptionsService: InscriptionsService,
    private router: Router,
    private route: ActivatedRoute,
    fb: FormBuilder
  ) {
    this.getParamId();
    const inscription: Inscription = inscriptionsService.getInscriptionById(this.paramId);
    this.students$ = inscriptionsService.getStudents();
    this.courses$ = inscriptionsService.getCourses();
    this.form = fb.group({
      id: [inscription.id],
      student: [inscription.student, Validators.compose([Validators.required])],
      course: [inscription.course, Validators.compose([Validators.required])],
    });
  }

  getParamId(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.paramId = params.get('id') ?? '';
    });
  }

  submit(form: FormGroup): void {
    let inscription: Inscription = {
      id: form.value.id,
      course: form.value.course,
      student: form.value.student,
    };

    this.inscriptionsService.editInscription(inscription);

    this.form.reset;

    this.router.navigate(['/inscriptions']);
  }

}
