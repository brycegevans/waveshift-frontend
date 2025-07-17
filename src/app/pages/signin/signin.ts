import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './signin.html',
  styleUrls: ['./signin.scss'] // or global styles
})
export class SignIn {

  errorMessages = {
    email: '',
    password: ''
  };
  constructor(private authService: AuthService, private toastService: ToastService, private router: Router){}

  onSubmit(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const email = formData.get('email')?.toString().trim() || '';
    const password = formData.get('password')?.toString().trim() || '';

    this.errorMessages.email = '';
    this.errorMessages.password = '';

    let valid = true;

    if (!email) {
      this.errorMessages.email = 'Email is required';
      valid = false;
    } else if (!this.validateEmail(email)) {
      this.errorMessages.email = 'Email must be valid';
      valid = false;
    }

    if (!password) {
      this.errorMessages.password = 'Password is required';
      valid = false;
    }

    if (!valid) {
      return;
    }

    // Submit the login data to backend API here
    this.authService.logIn({email,password}).subscribe({
    next: (res: any) => {
    
    console.log('Login successful', res);
  this.toastService.show('Login successfull!', 'success');
  localStorage.setItem('token', res.token);
  this.router.navigate(['/dashboard']);
    // Example: localStorage.setItem('token', res.token);
    },
    error: (err) => {
    
    console.error('Login failed', err);
    if (err.status === 401) {
      this.errorMessages.password = 'Incorrect email or password';
      this.toastService.show(this.errorMessages.password, 'error');
    } else {
      this.errorMessages.password = 'An unexpected error occurred';
    }
  }
});
  }

  validateEmail(email: string): boolean {
    // Simple regex for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}
