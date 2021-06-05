import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import {environment} from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class DataService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

    getIP(ip:string): Observable<any> {
      return this.http.get<any>(`${environment.ip_url}${ip}/json/`,this.httpOptions)
    }

    getRate(date:string,base:string): Observable<any> {
      return this.http.get<any>(`${environment.rate_url}rates?date=${date}&base=${base}`,this.httpOptions)
    }
}
