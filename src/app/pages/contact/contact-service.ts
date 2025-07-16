import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  private apiUrl =  environment.apiUrl +  'api/contact'; 

  constructor(private http: HttpClient) {}

  sendMessage(data: any){
    console.log(data);
    return this.http.post(this.apiUrl+'/sendMessage', data);
  }
}