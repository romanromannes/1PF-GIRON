import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UsersState } from '../../state/users.state';
import * as UsersActions from '../../state/users.actions';
import { User } from 'src/app/core/models/user';
import { Observable } from 'rxjs';
import { selectUsersLoader } from '../../state/users.selectors';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent {
  loader$: Observable<boolean>;
  form: FormGroup;
  constructor(
    private store: Store<UsersState>,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      userName: ['', Validators.compose([Validators.required])],
      pass: ['', Validators.compose([Validators.required])],
      profile: ['', Validators.compose([Validators.required])],
    });
    this.loader$ = this.store.select(selectUsersLoader);
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
      id: '',
      userName: form.value.userName,
      pass: form.value.pass,
      profile: form.value.profile,
    };

    this.store.dispatch(UsersActions.addUser({user: user}));

    this.form.reset();
  }
}
