import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UsersState } from '../../state/users.state';
import * as UsersActions from '../../state/users.actions';
import { selectUsersList, selectUsersLoader } from '../../state/users.selectors';
import { User } from 'src/app/core/models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent {
  form: FormGroup;
  paramId: string = '';
  user!: User;
  loader$: Observable<boolean>;
  
  constructor(
    private store: Store<UsersState>,
    private route: ActivatedRoute,
    fb: FormBuilder
  ) {
    this.getParamId();

    store.select(selectUsersList).subscribe((x: User[]) => {
      this.user = x.filter((u) => u.id === this.paramId)[0];
    });

    this.form = fb.group({
      id: [this.paramId],
      userName: [this.user.userName, Validators.compose([Validators.required])],
      pass: [this.user.pass, Validators.compose([Validators.required])],
      profile: [this.user.profile, Validators.compose([Validators.required])],
    });
    this.loader$ = this.store.select(selectUsersLoader);
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
    };

    this.store.dispatch(UsersActions.editUser({ user: user }));

    this.form.reset();
  }
}
