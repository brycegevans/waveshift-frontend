import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Contact } from './pages/contact/contact';
import { SignIn } from './pages/signin/signin';
import { Signup } from './pages/signup/signup';
import { Dashboard } from './pages/dashboard/dashboard';
import { AuthGuard } from './core/guard/authguard';

export const routes: Routes = 
[{ path: 'home', component: Home },
{ path: 'contact-us', component: Contact },
{path: 'signin', component: SignIn},
{path: 'signup', component: Signup},
{path: 'dashboard', component: Dashboard, canActivate: [AuthGuard]},
{path: '', redirectTo:'home', pathMatch: 'full'}
];
