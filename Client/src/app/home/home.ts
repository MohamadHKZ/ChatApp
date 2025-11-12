import { Component, inject, signal } from '@angular/core';
import { AccountsService } from '../../services/accounts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  accountsService = inject(AccountsService);
  router = inject(Router);
  onRegisterClicked() {
    this.router.navigateByUrl('/register');
  }
}
