import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/auth';
import { getFakeId } from 'src/app/core/models/data-fake';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent {

  form: FormGroup;
  constructor(
    private usersService: UsersService,
    private router: Router,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      userName: ['', Validators.compose([Validators.required])],
      pass: ['', Validators.compose([Validators.required])],
      profile: ['', Validators.compose([Validators.required])],
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
      id: getFakeId(),
      userName: form.value.userName,
      pass: form.value.pass,
      profile: form.value.profile,
      islogin: false
    };

    this.usersService.addUser(user);

    this.form.reset();

    this.router.navigate(['/users']);
  }
}
