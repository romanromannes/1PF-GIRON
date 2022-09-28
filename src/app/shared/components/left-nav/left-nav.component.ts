import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSessionUser } from 'src/app/auth/state/auth.selectors';
import { AuthState } from 'src/app/auth/state/auth.state';
import * as AuthActions from '../../../auth/state/auth.actions';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})
export class LeftNavComponent implements OnInit {

  sessionUser$;
  constructor(private store: Store<AuthState>) {
    this.sessionUser$ = this.store.select(selectSessionUser);
  }

  ngOnInit(): void {
  }

}
