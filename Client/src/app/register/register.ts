import { NgFor } from '@angular/common';
import { Component, EventEmitter, inject, output, Output, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AccountsService } from '../../services/accounts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registrationForm = viewChild<NgForm>('registrationForm');
  accountsService = inject(AccountsService);
  router = inject(Router);
  onSubmit() {
    if (this.registrationForm()?.valid) {
      const formValue = this.registrationForm()?.value;
      this.accountsService.Register({
        displayName: formValue.displayName,
        email: formValue.email,
        password: formValue.password,
      });
    }
  }

  onCancelClick() {
    this.router.navigateByUrl('/');
  }
}
