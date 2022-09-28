import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectSessionUser } from 'src/app/auth/state/auth.selectors';
import { AuthState } from 'src/app/auth/state/auth.state';
import * as AuthActions from '../../../auth/state/auth.actions';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent {
  sessionUser$;
  title: string = '<Coder University/>';
  constructor(private store: Store<AuthState>, private router: Router) {
    this.sessionUser$ = this.store.select(selectSessionUser);
  }

  logout() {
    this.store.dispatch(AuthActions.logOut());
    this.router.navigate(['/auth/login']);
  }
}
