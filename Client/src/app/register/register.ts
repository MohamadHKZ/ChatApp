import { NgFor } from '@angular/common';
import { Component, EventEmitter, inject, output, Output, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AccountsService } from '../../services/accounts.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registrationForm = viewChild<NgForm>('registrationForm');
  accountsService = inject(AccountsService);
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

  cancelClickEmitter = output<void>();

  onCancelClick() {
    this.cancelClickEmitter.emit();
  }
}
