import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable, ReplaySubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private config: any;
  private apiUrl = environment.apiUrl +"/auth";
 
  private userSubject = new BehaviorSubject<any>(null); // could be a User interface
  user$ = this.userSubject.asObservable();

constructor(private http: HttpClient, private router: Router, private toastService: ToastService) {}

logIn(request:any){
    return this.http.post(this.apiUrl+'/login',request);
}
getUserInfo(): any {
    const token = localStorage.getItem('token');  // assuming token stored here
    
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
    });

    return this.http.get(this.apiUrl +'/account', { headers });
}
register(request:any){
    return this.http.post(this.apiUrl+'/register', request);
}

  logout() {
    localStorage.removeItem('token');
    this.clearUser();
    this.toastService.show('You have been logged out','info');
    this.router.navigate(["/home"]);
  }

  setUser(user: any) {
    this.userSubject.next(user);
  }

  clearUser() {
    this.userSubject.next(null);
  }

  getCurrentUser() {
    return this.userSubject.value;
  }
}
