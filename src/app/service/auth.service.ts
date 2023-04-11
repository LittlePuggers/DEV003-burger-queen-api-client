import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService{
    constructor(private http: HttpClient) {}
    
    apiurl: string = 'http://localhost:3000';

    login(email:string, password:string ) {
        return this.http.post(`${this.apiurl}/auth`, {email, password})
            // this is just the HTTP call, 
            // we still need to handle the reception of the token
    }
    logout(): void {
        localStorage.removeItem('token')
    }
    getToken(): any {
        return localStorage.getItem('token');
      }
    isAuthenticated(): boolean {
        return !!this.getToken();
      }
}