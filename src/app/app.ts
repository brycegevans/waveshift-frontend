import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { ConfigService } from './core/services/config.service';
import { ToastComponent } from './core/toast/toast.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header,Footer,ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('wave-shift');
  constructor(private configService: ConfigService,private router: Router){{
     this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
          // Try to scroll to the element with the matching ID
          const element = document.getElementById(tree.fragment);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          // Default scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
  }
}
    ngOnInit(): void {
    // Call service method to load config + employees
    this.configService.loadStartupData()
      .then(() => {
        console.log('Config and employees loaded!');
        
        const employees = this.configService.getEmployeesSnapshot();
        console.log(employees);
      })
      .catch(error => {
        console.error('Failed to load startup data', error);
      });
  }
}
