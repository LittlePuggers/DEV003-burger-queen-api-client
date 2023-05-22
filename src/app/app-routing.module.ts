import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WaiterComponent } from './waiter/waiter/waiter.component';
import { AuthResolver } from '../services/auth.resolver';
import { ChefComponent } from './chef/chef.component';
import { CookedOrdersComponent } from './cooked-orders/cooked-orders.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
const routes: Routes = [
  { path: '', component: LoginComponent, resolve: { isAuthenticated: AuthResolver } },
  { path: 'login', component: LoginComponent },
  { path: 'waiter', component: WaiterComponent, resolve: { isAuthenticated: AuthResolver } },
  { path: 'chef', component: ChefComponent, resolve: { isAuthenticated: AuthResolver } },
  { path: 'cookedOrders', component: CookedOrdersComponent, resolve: { isAuthenticated: AuthResolver } },
  { path: 'adminUsers', component: AdminUsersComponent, resolve: { isAuthenticated: AuthResolver } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
