import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
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
      // .pipe(
      //   retry(3),
      //   tap((data: any) => {
      //     console.log(`added hero w/ id=`,data)
      //   }),
      //   catchError(this.handleError<any>('addHero'))
      // );
    }

    getRate(date:string,base:string): Observable<any> {
      return this.http.get<any>(`${environment.rate_url}rates?date=${date}&base=${base}`,this.httpOptions)
      // .pipe(
      //   tap((data: any) => console.log(`added hero w/ id=`,data)),
      //   catchError(this.handleError<any>('addHero'))
      // );
    }
    getPresentIp(): Observable<any> {
      return this.http.get<any>(`${environment.present_ip_url}?format=json`,this.httpOptions)
      .pipe(
        retry(3)
      );
    }

    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
    
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
    
        // TODO: better job of transforming error for user consumption
        console.log(`${operation} failed: ${error.message}`);
    
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
    // 
}
