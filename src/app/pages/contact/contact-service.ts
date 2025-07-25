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
export class ContactService {
  private apiUrl =  environment.apiUrl +  '/contact'; 

  constructor(private http: HttpClient) {}

  sendMessage(data: any){
    console.log(data);
    const headers = new HttpHeaders({
          'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl+'/sendMessage', data, {headers: headers, withCredentials:true});
  }
}