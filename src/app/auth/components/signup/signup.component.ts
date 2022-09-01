import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Login } from 'src/app/core/models/auth';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  form: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private usersService: UsersService,
    private router: Router,
    fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.form = fb.group({
      userName: ['', Validators.compose([Validators.required])],
      pass: ['', Validators.compose([Validators.required])],
      confirmPass: ['', Validators.compose([Validators.required])],
    });
  }

  getErrorMessage() {
    if (this.form.value.userName.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.form.value.pass.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.form.value.confirmPass.hasError('required')) {
      return 'You must enter a value';
    }
   
    return 'error';
  }

  submit(form: FormGroup): void {
    const data: Login = {
      userName: form.value.userName,
      pass: form.value.pass,
    };

    const signup = this.usersService.signin(data);

    this.form.reset();

    if (signup === true) {
      return;
    }

    this.openSnackBar('Error', 'Incorrect credentials');
  }

  openSnackBar(msg: string, action: string) {
    this._snackBar.open(msg, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000,
    });
  }
}
