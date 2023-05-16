import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = 'http://localhost:3000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  constructor(private http: HttpClient, public router: Router, private snackBar: MatSnackBar) {}
  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/users/register`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }
  // Sign-in
  signIn(user: User) {
    let api = `${this.endpoint}/users/login`;
    return this.http.post(api, user)
      .subscribe(
        (res: any) => {
          localStorage.setItem('access_token', res.token);
          this.router.navigate(['account/']);
        },
        (error: any) => {
          if (error.status === 401) {
            this.snackBar.open('Wrong Password', 'Close', { duration: 3000 });
          } else {
            this.snackBar.open('An error occurred', 'Close', { duration: 3000 });
          }
        }
      );
  }

  
  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['/login']);
    }
  }
  // User profile
  getUserProfile(id: any): Observable<any> {
    let api = `${this.endpoint}/users/info/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  getUserProfileToken(): Observable<any> {
    const token = localStorage.getItem('access_token'); // Ottieni il token JWT memorizzato

    // Aggiungi il token JWT alle intestazioni della richiesta
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<any>(`${this.endpoint}/users/profile`, { headers });
  }
  
  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}