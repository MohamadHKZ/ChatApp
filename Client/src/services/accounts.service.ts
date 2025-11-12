import { inject, Injectable, Signal, signal } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  CurrentUser = signal<User | null>(null);
  router = inject(Router);
  toastService = inject(ToastService);
  constructor(private httpClient: HttpClient) {}

  public Register(registerCreds: registerCreds) {
    this.httpClient
      .post<User>('https://localhost:5001/api/accounts/register', registerCreds)
      .subscribe({
        next: (user) => {
          this.LoginUser(user);
          this.toastService.ShowSuccess('Registration successful');
        },
        error: () => {
          console.error('Registration failed');
          this.toastService.ShowError('Registration failed');
        },
      });
  }

  public Login(email: string, password: string) {
    this.httpClient
      .post<User>('https://localhost:5001/api/accounts/login', { email, password })
      .subscribe({
        next: (user) => {
          this.LoginUser(user);
          this.toastService.ShowSuccess('Login successful');
        },
        error: () => {
          console.error('Login failed');
          this.toastService.ShowError('Login failed');
        },
      });
  }
  public LoginCurrentUser() {
    const user = this.GetLoggedInUser();
    if (user) {
      this.CurrentUser.set(user);
    }
  }

  public LoginUser(user: User) {
    this.CurrentUser.set(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.router.navigateByUrl('/members');
  }
  public Logout() {
    localStorage.removeItem('currentUser');
    this.CurrentUser.set(null);
    this.router.navigateByUrl('/');
    this.toastService.ShowSuccess('Logout successful');
  }

  private GetLoggedInUser() {
    return localStorage.getItem('currentUser')
      ? JSON.parse(localStorage.getItem('currentUser') as string)
      : null;
  }
}
