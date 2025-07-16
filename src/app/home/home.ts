import { Component, OnInit } from '@angular/core';
import { Header } from "../header/header";
import { Feature } from '../feature/feature';
import { Footer } from "../footer/footer";
import { Router } from '@angular/router';
import { ConfigService } from '../core/services/config.service';

@Component({
  selector: 'app-home',
  imports: [Feature],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit{
  config: any;
  title = '';
  
  constructor(private router: Router, private configService: ConfigService){}
 
 
  ngOnInit(): void {
    this.configService.getConfigWhenReady().subscribe(config => {
      this.config = config;
      this.title = this.config.find((item: { key: string; }) => item.key == 'site_name')?.value;
    });
  }
  goToContact(){
    this.router.navigate(['/contact-us']);
  }
}
