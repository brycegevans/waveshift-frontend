import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl =  environment.apiUrl +  '/auth'; 

  constructor(private http: HttpClient) {}

  updateUser(data: any){
    const headers = new HttpHeaders({
          'Content-Type': 'application/json'
    });
    console.log(data);
    let id = data.id;
    return this.http.put(this.apiUrl+'/update'+`/${id}`, data,{headers: headers, withCredentials:true});
  }
}