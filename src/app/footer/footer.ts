import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [RouterModule, CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer implements OnInit{
  user:any;
  constructor(private authService: AuthService){}

  ngOnInit(): void {
      this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }
  

}
