import { CanActivateFn, Router } from '@angular/router';
import { AccountsService } from '../services/accounts.service';
import { inject } from '@angular/core';
import { ToastService } from '../services/toast.service';

export const authGuard: CanActivateFn = (route, state) => {
  const accountsService = inject(AccountsService);
  const toastService = inject(ToastService);
  const router = inject(Router);
  if (!accountsService.CurrentUser()) {
    toastService.ShowError('You must be logged in to access this page.');
    router.navigate(['register']);
    return false;
  }
  return true;
};
