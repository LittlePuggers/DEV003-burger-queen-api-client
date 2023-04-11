import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  
  // @ViewChild('myButton', { static: true }) myButton: ElementRef<HTMLButtonElement> | undefined;
  
  loginForm:FormGroup;

  constructor(private fb:FormBuilder, 
               private authService: AuthService, 
               private router: Router) {

      this.loginForm = this.fb.group({
          email: ['',Validators.required],
          password: ['',Validators.required]
      });
  }

  login() {
      const val = this.loginForm.value;

      if (val.email && val.password) {
          this.authService.login(val.email, val.password)
              .subscribe(
                  () => {
                      console.log("User is logged in");
                      this.router.navigateByUrl('/');
                  }
              );
      }
  }

  onSubmit() {
    const formData = this.loginForm.value;
    console.log(formData);
  }
}
