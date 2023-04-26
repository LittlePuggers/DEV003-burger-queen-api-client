import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from 'src/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';
// import { RouterTestingModule } from '@angular/router/testing';
// import { Router } from '@angular/router';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService = AuthService;
  let httpMock: HttpTestingController;
  // let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, 
        // Router, RouterTestingModule
      ],
      providers: [AuthService]
    })
    .compileComponents();
    
    authService = TestBed.get(AuthService);

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = TestBed.inject(HttpTestingController);
    // router = TestBed.inject(Router);
          
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.login() when login button is clicked', () => {
    spyOn(authService, 'login');
    const loginButton = fixture.nativeElement.querySelector('button[type="submit"]');
    loginButton.click();
    expect(authService.login).toHaveBeenCalled();
  });

  it('should generate a token in localStorage when form is submitted', () => {
    spyOn(authService, 'login').and.callFake(() => {
      return from([{ token: 'mockToken' }]);
    });
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    submitButton.click();
    fixture.whenStable().then(() => {
      expect(localStorage.getItem('token')).toBe('mockToken');
    });
  });

  // it('should navigate to another route when user is logged in', ()=>{
  //   const url = 'http://localhost:4200/waiter';
  //   const navigateSpy = spyOn(router, 'navigateByUrl');
  //   spyOn(authService, 'login').and.callFake(() => {
  //     return from([{ token: 'mockToken' }]);
  //   });
  //   const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
  //   submitButton.click();
  //   fixture.whenStable().then(() => {
  //     expect(navigateSpy).toHaveBeenCalledWith(url);
  //     expect(location.pathname).toBe(url)
  //   });
  // })
});


// 1. si el componente existe YA PASÓ
// 2. si el componente loguea (ver si el boton hace submit) YA PASO
// 3. si el componente guarda el token YAPASO!!! :)
// 4. si el componente lleva a la otra vista (waiter) cuando el usuario se autentifica
// 5. si el componente bloquea al usuario con contraseña o email incorrecto (el mock de http debe dar error)