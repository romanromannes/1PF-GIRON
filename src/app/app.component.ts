import { Component } from '@angular/core';
import { UsersService } from './core/services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  sessionUser$;
  constructor(private usersService: UsersService) {
    this.sessionUser$ = usersService.getSessiontUser();
  }
}
