import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { User } from 'src/app/core/models/auth';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent {
  form: FormGroup;
  paramId: string = '';

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    fb: FormBuilder
  ) {
    this.getParamId();
    const user: User = usersService.getUserById(this.paramId);
    this.form = fb.group({
      id: [user.id],
      userName: [user.userName, Validators.compose([Validators.required])],
      pass: [user.pass, Validators.compose([Validators.required])],
      profile: [user.profile, Validators.compose([Validators.required])],
    });
  }

  getParamId(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.paramId = params.get('id') ?? '';
    });
  }

  getErrorMessage() {
    if (this.form.value.userName.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.form.value.pass.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.form.value.profile.hasError('required')) {
      return 'You must enter a value';
    }

    return 'Error';
  }

  submit(form: FormGroup): void {
    let user: User = {
      id: form.value.id,
      userName: form.value.userName,
      pass: form.value.pass,
      profile: form.value.profile,
      islogin: false
    };

    this.usersService.editUser(user);

    this.form.reset();

    this.router.navigate(['/users']);
  }
}
