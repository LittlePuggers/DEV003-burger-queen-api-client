import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { NgModel } from '@angular/forms';
import { Product } from '../interfaces/producto';
import { Order } from '../interfaces/orden';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  @Input() productSelected!: Product 

  selectedProducts: Product[] = []

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
    this.addSelectedProduct(this.productSelected)
  } 

  addSelectedProduct(productSelected: Product) {
    this.selectedProducts.push(productSelected)
    console.log(this.selectedProducts)
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
      // console.log(orders)
    });
  }
}
