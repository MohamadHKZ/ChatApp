import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastContainer: HTMLDivElement | null = null;
  constructor() {
    this.CreateToastContainer();
    this.toastContainer = document.getElementById('toast-container') as HTMLDivElement;
  }

  private CreateToastContainer() {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast toast-end toast-bottom w-1/6';
      document.body.appendChild(container);
    }
  }

  private CreateToastElement(message: string, type: string) {
    const toast = document.createElement('div');
    toast.className = `alert ${type} transition-opacity duration-200`;
    toast.innerHTML = `
        <span>${message}</span>
        <button class="btn btn-sm btn-neutral justify-self-end">X</button>
    `;
    toast.querySelector('button')?.addEventListener('click', () => {
      toast.classList.add('opacity-0');
      toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    });
    this.toastContainer?.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('opacity-0');
      toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }, 3000);
    return toast;
  }

  public ShowSuccess(message: string) {
    this.CreateToastElement(message, 'alert-success');
  }

  public ShowError(message: string) {
    this.CreateToastElement(message, 'alert-error');
  }

  public ShowInfo(message: string) {
    this.CreateToastElement(message, 'alert-info');
  }

  public ShowWarning(message: string) {
    this.CreateToastElement(message, 'alert-warning');
  }
}
