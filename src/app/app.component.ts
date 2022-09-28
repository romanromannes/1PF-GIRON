import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSessionUser } from './auth/state/auth.selectors';
import { AuthState } from './auth/state/auth.state';
import * as AuthActions from './auth/state/auth.actions'
import { SessionUser } from './core/models/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  sessionUser$: Observable<SessionUser>;

  constructor(private store: Store<AuthState>) {
    this.sessionUser$ = store.select(selectSessionUser);
  }
}
