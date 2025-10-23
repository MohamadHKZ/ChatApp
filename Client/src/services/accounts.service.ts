import { Injectable, Signal, signal } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  CurrentUser = signal<User | null>(null);

  constructor(private httpClient: HttpClient) {
    this.CurrentUser.set(this.GetLogedInUser());
  }

  public Register(registerCreds: registerCreds) {
    this.httpClient
      .post<User>('https://localhost:5001/api/accounts/register', registerCreds)
      .subscribe({
        next: (user) => {
          this.CurrentUser.set(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
        },
        error: () => {
          console.error('Registration failed');
        },
      });
  }

  public Login(email: string, password: string) {
    this.httpClient
      .post<User>('https://localhost:5001/api/accounts/login', { email, password })
      .subscribe({
        next: (user) => {
          this.CurrentUser.set(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
        },
        error: () => {
          console.error('Login failed');
        },
      });
  }

  public Logout() {
    localStorage.removeItem('currentUser');
    this.CurrentUser.set(null);
  }

  private GetLogedInUser() {
    return localStorage.getItem('currentUser')
      ? JSON.parse(localStorage.getItem('currentUser') as string)
      : null;
  }
}
