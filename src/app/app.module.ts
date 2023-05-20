import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WaiterComponent } from './waiter/waiter/waiter.component';

import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { OrderComponent } from './order/order.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ChefComponent } from './chef/chef.component';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './pipes/filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WaiterComponent,
    MenuComponent,
    OrderComponent,
    ProductCardComponent,
    ChefComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
