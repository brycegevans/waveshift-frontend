  import { Component, OnInit } from '@angular/core';
  import { Router, RouterModule } from '@angular/router';
  import { ToastService } from '../../core/toast/toast.service';
  import { AuthService } from '../../core/services/auth.service';
  import { CommonModule } from '@angular/common';
  import { FormsModule } from '@angular/forms';
  import { DashboardService } from './dashboard-service';

  @Component({
    selector: 'app-dashboard',
    imports: [RouterModule, CommonModule,FormsModule],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.scss'
  })
  export class Dashboard {

    
  constructor(private authService: AuthService, private router: Router, private toastService: ToastService, private dashboardService: DashboardService){}
  user:any;
  userData: any;
  error: string | null = null;
  showProfile = false;

  ngOnInit() {
    this.loadData();
    }
    loadData(){
      this.authService.getUserInfo().subscribe({
        next: (data: any) =>{ 
          this.user = data
          this.userData = { ...data }; //this creates shallow copy with data separation
          console.log(this.user);
          this.authService.setUser(this.user); 
        },
        error: () => {
          this.toastService.show('There was an error with authetication try loggin in again', 'error');
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
      this.dashboardService.updateUser(this.userData).subscribe({
        next: (response) => {
          console.log('Request succeeded:', response);
          this.toastService.show('Update successfull!', 'success');
          this.loadData();
        },
        error: (err) => {
          console.error('Request failed:', err);
          this.toastService.show('Failed to update user. Please try again.', 'error');
        },
        complete: () => {
          console.log('Update request completed.');
        }
      });
    } 
    
    }
