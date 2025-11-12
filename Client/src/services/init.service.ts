import { inject, Injectable, signal, computed } from '@angular/core';
import { AccountsService } from './accounts.service';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  private initialized = signal(false);
  private accountsService = inject(AccountsService);
  constructor() {}
  public Initialize() {
    this.initialized.set(true);
    this.accountsService.LoginCurrentUser();
  }
  public isInitialized = computed(() => this.initialized());
}
