import { NgFor } from '@angular/common';
import {
  afterEveryRender,
  Component,
  ElementRef,
  inject,
  Signal,
  ViewChild,
  viewChild,
} from '@angular/core';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { AccountsService } from '../../services/accounts.service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  logout() {
    this.AccountsService.Logout();
  }
  constructor() {}

  LoginForm: Signal<NgForm> = viewChild.required('loginForm');
  public AccountsService = inject(AccountsService);
  onSubmit() {
    const email = this.LoginForm().controls['email'].value;
    const password = this.LoginForm().controls['password'].value;
    this.AccountsService.Login(email, password);
  }
}
