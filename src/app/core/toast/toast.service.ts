import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: { message: string; type: 'success' | 'error' | 'info' }[] = [];

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    this.toasts.push({ message, type });

    // Auto remove after 4 seconds
    setTimeout(() => {
      this.toasts.shift();
    }, 4000);
  }
}