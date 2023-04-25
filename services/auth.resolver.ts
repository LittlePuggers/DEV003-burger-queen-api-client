import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthResolver implements Resolve<boolean> {

    constructor(private authService: AuthService, private router: Router) { }

    resolve(): Observable<boolean> {
        if (this.authService.isLoggedIn()) {
            return of(true);
        } else {
            this.router.navigate(['/login']);
            return of(false);
        }
    }

}
