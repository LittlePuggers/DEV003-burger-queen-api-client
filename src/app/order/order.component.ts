import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NgModel } from '@angular/forms';

interface Order {
  id: number,
  userId: string,
  client: string,
  products: [
    {
      qty: number,
      product: {
        id: number,
        name: string,
        price: number,
        image: string,
        type: string,
        dateEntry: string,
      }
    }
  ],  
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  orders: Array<Order> = [{
    id: 0,
    userId: '',
    client: '',
    products: [
      {
        qty: 0,
        product: {
          id: 0,
          name: '',
          price: 0,
          image: '',
          type: '',
          dateEntry: '',
        }
      }
    ],  
  }]

  newOrder = {
    id: 0,
    userId: '',
    client: '',
    products: [
      {
        qty: 0,
        product: {
          id: 0,
          name: '',
          price: 0,
          image: '',
          type: '',
          dateEntry: '',
        }
      }
    ],  
  };

  constructor(private http: HttpClient) {
    this.showOrders() // Muestra los productos en la consola
  } 
  
  addProduct(product:any, qty:number) {
    this.newOrder.products.push({ product, qty });
  }
  
  // Otros métodos para agregar detalles a la nueva orden aquí

  getOrders(): Observable<any> {
    return this.http.get('http://localhost:3000/orders')
  }
  
  showOrders(): void {
    this.getOrders().subscribe((orders) => {
      this.orders = orders;
      console.log(orders)
    });
  }
}
