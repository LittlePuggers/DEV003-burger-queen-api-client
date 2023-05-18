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

  messageError: any;

  constructor(
    private fb:
      FormBuilder,
    private loginProvider: AuthService,
    private router: Router,) { }
  ngOnInit(): void {
    this.myForm = this.createMyForm();
  }
  private createMyForm(): FormGroup {

    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  public submitForm(): void {
    if (this.myForm.value === undefined) { return };
    const { email, password } = this.myForm.value;

    this.loginProvider.login(email, password).subscribe({
      next: (res) => {
        console.log(res.accessToken);
        // console.log(res.user)
        localStorage.setItem('access_token', res.accessToken);
        localStorage.setItem('userId', JSON.stringify(res.user.id));
        localStorage.setItem('rol', JSON.stringify(res.user.rol));
        if (res.user.rol === "mesero") {
          this.router.navigate(['/waiter'])
        };
        if (res.user.rol === "cocina") {
          this.router.navigate(['/chef'])
        };

      },
      error: (err) => {
        this.messageError = err;
        console.log(this.messageError);
      }
    })

  }

  public clearError(): void {
    this.messageError = null;
  }

}
