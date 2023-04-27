import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',

  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  products = [{
    image: '',
    name: '',
    price: 0,
  }]
  constructor(private http: HttpClient) { this.showProducts() } // Muestra los productos en la consola
  getProducts(): Observable<any> {
    console.log(this.getProducts)
    return this.http.get('http://localhost:3000/products')
  }
  showProducts(): void {
    this.getProducts().subscribe((products) => {
      this.products = products;
      console.log(products);
    });
  }
}

