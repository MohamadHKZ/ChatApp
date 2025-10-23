import { Component, inject, signal } from '@angular/core';
import { Register } from '../register/register';
import { AccountsService } from '../../services/accounts.service';

@Component({
  selector: 'app-home',
  imports: [Register],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  registerClicked = signal<boolean>(false);
  accountsService = inject(AccountsService);
}
