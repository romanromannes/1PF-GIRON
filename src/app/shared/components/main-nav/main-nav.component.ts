import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent {
  sessionUser$;
  constructor(private usersService: UsersService, private router: Router) {
    this.sessionUser$ = this.usersService.getSessiontUser();
  }

  logout() {
    this.usersService.logout();
    this.router.navigate(['/auth/login']);
  }
}
