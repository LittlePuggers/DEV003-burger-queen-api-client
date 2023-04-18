import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  api:string = 'http://localhost:3000/login';

  login(email: string, password: string): Observable<any> {
    const body = {email, password};
    const header = new HttpHeaders({
      'Content-Type': 'application/json'});
      console.log(body);
    return this.http.post(this.api, body, {headers:header})

    // if (email === 'juan.mesero@bq.com' && password === '1234') {
    //   localStorage.setItem('currentUser', JSON.stringify({ email: email, password: password }));
    //   return true;
    // } else {
    //   return false;
    // }
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

}
