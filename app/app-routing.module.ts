import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WaiterComponent } from './waiter/waiter/waiter.component';
import { AuthResolver } from '../services/auth.resolver';
const routes: Routes = [
  { path: '', component: LoginComponent, resolve: { isAuthenticated: AuthResolver } },
  { path: 'login', component: LoginComponent },
  { path: 'waiter', component: WaiterComponent, resolve: { isAuthenticated: AuthResolver } }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }