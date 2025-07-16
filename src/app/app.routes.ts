import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Contact } from './pages/contact/contact';

export const routes: Routes = 
[{ path: 'home', component: Home },
{ path: 'contact-us', component: Contact },
{path: '', redirectTo:'home', pathMatch: 'full'}
];
