import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  userAuth$;
  constructor(private authService:AuthService) { 
    this.userAuth$ = this.authService.getUserAuth();
  }

  logout() {
    this.authService.logout();
  }
}
