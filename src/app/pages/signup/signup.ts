import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/toast/toast.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [FormsModule,CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class Signup {
  formData = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  };
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router, private authService: AuthService,private toastService: ToastService){}

  onSubmit(){
    this.authService.register(this.formData) .subscribe({
        next: res => {
          this.successMessage = 'Account created!, try signing in';
          this.toastService.show(this.successMessage, 'success');
          setTimeout(() => this.router.navigate(['/signin']), 1500);
        },
        error: err => {
          this.errorMessage = err.error?.message || 'Signup failed';
          this.toastService.show(this.errorMessage, 'error');
        }
      });
  }
}
