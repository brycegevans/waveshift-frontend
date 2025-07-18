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
    messages: string[] = [
    'Sign up to stay in the loop.',
    'Get early access to our tools.',
    'Be part of what we’re building.',
    'Join us on the ground floor.'
  ];
   rotatingMessage: string = this.messages[0];
  private messageIndex: number = 0;
  private intervalId: any;

  
  constructor(private router: Router, private configService: ConfigService){}
 
 
  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.messageIndex = (this.messageIndex + 1) % this.messages.length;
      this.rotatingMessage = this.messages[this.messageIndex];
    }, 6000); // Matches your CSS animation
    this.configService.getConfigWhenReady().subscribe(config => {
      this.config = config;
      this.title = this.config.find((item: { key: string; }) => item.key == 'site_name')?.value;
    });
  }
  goToContact(){
    this.router.navigate(['/contact-us']);
  }
  
  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
