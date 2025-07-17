import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule,CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit{
  constructor(private router: Router,private authService: AuthService){}
  user: any;
  ngOnInit(): void {
      this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  goHome(){
    this.router.navigate(['/home'])
  }
  logout(){
    this.authService.logout();
  }
}
