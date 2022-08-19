import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuth } from 'src/app/shared/models/user-auth';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

  form: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      userName: ['', Validators.compose([Validators.required])],
      pass: ['', Validators.compose([Validators.required])],
    });
  }

  getErrorMessage() {
    if (this.form.value.userName.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.form.value.pass.hasError('required')) {
      return 'You must enter a value';
    }
    return 'error';
  }

  submit(form: FormGroup): void {
    const user: UserAuth = {
      userName: form.value.userName,
      pass: form.value.pass,
      profile: 'admin',
      islogin: true,
    };

    const login = this.authService.login(user);

    this.form.reset;

    if(login) {
      this.router.navigate(['/home']);
      return;
    }

    this.router.navigate(['/auth/login']);
  }

}
