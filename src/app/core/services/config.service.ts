import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable, ReplaySubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  // Internal config object (untyped or loosely typed)
  private config: any;
private apiUrl = environment.apiUrl +"/hero";
  // Employee list as BehaviorSubject for shared access
  private employees = new BehaviorSubject<any[]>([]);
  private configReady = new ReplaySubject<any>(1);
  employees$ = this.employees.asObservable();

  constructor(private http: HttpClient) {}

  loadStartupData(): Promise<void> {
    const headers = new HttpHeaders({
          'Content-Type': 'application/json'
    });
    return new Promise((resolve, reject) => {
      forkJoin({
        config: this.http.get(this.apiUrl+'/getConfiguration', {headers:headers, withCredentials:true}),
        employees: this.http.get<any[]>(this.apiUrl + '/getEmployees', {headers: headers, withCredentials:true})
      }).subscribe({
        next: ({ config, employees }) => {
          this.config = config;
            this.configReady.next(config);
          this.employees.next(employees);
          resolve();
        },
        error: err => reject(err)
      });
    });
  }

  
getConfigWhenReady(): Observable<any> {
  return this.configReady.asObservable();
}

  getEmployeesSnapshot(): any[] {
    return this.employees.getValue();
  }
}
