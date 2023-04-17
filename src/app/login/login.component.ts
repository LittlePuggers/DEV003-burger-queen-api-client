import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public myForm!: FormGroup;
  public submitted = false;

  constructor(private fb: FormBuilder, private loginProvider: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.myForm = this.createMyForm();
  }
  private createMyForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  public submitForm():void {
    // this.submitted = true;
    if(this.myForm.value === undefined) {return};
    const { email, password} = this.myForm.value;
  
  

    this.loginProvider.login(email, password).subscribe({
      next: (res)=>{console.log(res)}, 
      error: (err)=>{console.log(err)}})

    // if (this.myForm.invalid) {
    //   alert("Ingrese usuario y contraseña");
    // } else {
    //   const { email, password } = this.myForm.value;

    //   if (!this.loginProvider.login(email, password)) {
    //     alert('Email o contraseña inválida');
    //   } else {
    //     // alert("The form was submitted.");
    //     console.log(this.myForm.value);
    //     this.router.navigate(['/waiter']);
    //   }
    // }
  }


}