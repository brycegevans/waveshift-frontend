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
export class TeamService {
  private apiUrl = environment.apiUrl + 'api/hero'; // Adjust as needed

  constructor(private http: HttpClient) {}

//   getEmployees(){
//     return this.http.get<any[]>(this.apiUrl + '/getEmployees');
//   }
}