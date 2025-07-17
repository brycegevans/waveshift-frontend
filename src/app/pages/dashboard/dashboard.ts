import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastService } from '../../core/toast/toast.service';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, CommonModule,FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

  
constructor(private authService: AuthService, private router: Router, private toastService: ToastService){}
user:any;
error: string | null = null;
 showProfile = false;

ngOnInit() {
    this.authService.getUserInfo().subscribe({
      next: (data: any) =>{ 
        this.user = data
        console.log(this.user);
        this.authService.setUser(this.user); 
      },
      error: () => {
        this.toastService.show('There was an error with authetication try again', 'error');
        this.router.navigate(['/login']);  
      }
    });
  }
    logout() {
    this.authService.logout();
  }
    toggleProfile() {
    this.showProfile = !this.showProfile;
  }

  updateProfile() {
    // Just a demo: normally you would call an API to update the user profile
    alert(`Profile updated!\nEmail: ${this.user.email}\nRole: ${this.user.role}`);
    this.showProfile = false;
  }

  }
