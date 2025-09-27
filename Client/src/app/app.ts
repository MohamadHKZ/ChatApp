import { Component, effect, OnInit, Signal } from '@angular/core';
import { UsersService } from './services/users.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  users: Signal<User[]> | null = null;
  constructor(private usersService: UsersService) {
    this.users = this.usersService.Users;
  }
  ngOnInit() {
    this.usersService.loadUsers();
  }
}
