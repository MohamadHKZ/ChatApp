import { Injectable, Signal, signal } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}
  private users = signal<User[]>([]);

  public Users: Signal<User[]> = this.users.asReadonly();

  loadUsers() {
    this.httpClient.get<User[]>('https://localhost:5001/api/users').subscribe({
      next: (users) => {
        this.users.set(users);
        console.log(users);
      },
      error: (err) => console.log(err),
      complete: () => console.log('Users fetched successfully'),
    });
  }
}
