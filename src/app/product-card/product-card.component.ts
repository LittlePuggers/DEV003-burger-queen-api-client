import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Product {
  id: number,
  dateEntry: string,
  image: string,
  name: string,
  price: number,
  type: string
}

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})

export class ProductCardComponent {
  products: Array<Product> = [{
    id: 0,
    dateEntry: '',
    image: '',
    name: '',
    price: 0,
    type: ''
  }]

  breakfastItems: Product[] = []
  lunchItems: Product[] = []

  constructor(private http: HttpClient) {
    this.showProducts() // Muestra los productos en la consola
  } 
  
  getProducts(): Observable<any> {
    return this.http.get('http://localhost:3000/products')
  }
  
  showProducts(): void {
    this.getProducts().subscribe((products) => {
      this.products = products;
      this.breakfastItems = this.products.filter((product)=> 
        product.type === 'Desayuno'
      )
      this.lunchItems = this.products.filter((product)=>{
        return product.type === 'Resto del día'
      })
      // console.log(this.products);
      // console.log(this.breakfastItems);
      // console.log(this.lunchItems)
    });
  }
  
}

