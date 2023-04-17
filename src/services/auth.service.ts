import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  api:string = 'http://localhost:3000/auth';

  login(email: string, password: string): Observable<any> {
    const body = {email:String, password:String};
    return this.http.post(this.api, body)

    // if (email === 'juan.mesero@bq.com' && password === '1234') {
    //   localStorage.setItem('currentUser', JSON.stringify({ email: email, password: password }));
    //   return true;
    // } else {
    //   return false;
    // }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

}
