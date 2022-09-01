import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})
export class LeftNavComponent implements OnInit {

  users$;
  constructor(private usersService: UsersService) {
    this.users$ = this.usersService.getSessiontUser();
  }

  ngOnInit(): void {
  }

}
