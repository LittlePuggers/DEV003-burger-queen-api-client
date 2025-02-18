import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static login(login: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient, private router: Router) { }

  api: string = 'http://localhost:3000/login';

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    const header = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    // console.log(body);
    return this.http.post(this.api, body, { headers: header })
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('userId');
    localStorage.removeItem('rol');
    this.router.navigate(['/login'])
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

}
