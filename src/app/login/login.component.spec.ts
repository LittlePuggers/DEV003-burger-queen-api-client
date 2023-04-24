// jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from 'src/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService = AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [AuthService]
    })
    .compileComponents();

    authService = TestBed.get(AuthService);

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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


});

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

    
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should set token in local storage on successful login', () => {
    // spyOn(service, 'login');
    const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    const mockUser = { email: 'test@email.com', password: 'testpassword' };

    service.login(mockUser.email, mockUser.password).subscribe(response => {
      // localStorage.setItem('access_token', response.accessToken);
      // console.log(response.token);
      expect(localStorage.getItem('access_token')).toEqual(mockToken);
    });
    
    const loginRequest = httpMock.expectOne('http://localhost:3000/login');
    expect(loginRequest.request.method).toBe('POST');
    loginRequest.flush({ token: mockToken });
  });
});

// 1. si el componente existe YA PASÓ
// 2. si el componente loguea (ver si el boton hace submit) YA PASO
// 3. si el componente guarda el token
// 4. si el componente lleva a la otra vista (waiter) cuando el usuario se autentifica
// 5. si el componente bloquea al usuario con contraseña o email incorrecto