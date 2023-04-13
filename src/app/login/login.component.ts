import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public myForm!: FormGroup;
  public submitted = false;

  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.myForm = this.createMyForm();
  }
  private createMyForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  public submitForm() {
    this.submitted = true;

    console.log(this.myForm);
    if (this.myForm.invalid) {
      // alert("Ingrese usuario y contraseña")
    } else {
      alert("The form was submitted.");
      console.log(this.myForm.value);
    }
  }
}