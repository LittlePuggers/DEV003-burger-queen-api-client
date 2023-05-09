import { Component, EventEmitter, Output } from '@angular/core';
import { Order } from 'src/app/interfaces/orden';
import { ProductOrder } from 'src/app/interfaces/productOrder';
import { Product } from 'src/app/interfaces/producto';

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.css']
})
export class WaiterComponent {

  productoSeleccionado!: ProductOrder

  productosSeleccionados: ProductOrder[] = []

  reciboProducto(product: Product) {

    const findProductById = (id: number): ProductOrder | undefined => {
      return this.productosSeleccionados.find((productOrder: { product: { id: number; }; }) => productOrder.product.id === id);
    }

    const existingProduct = findProductById(product.id);
    if (existingProduct) {
      existingProduct.qty++;
    } else {

      this.productosSeleccionados.push({
        qty: 1,
        product: product
      });
    }

    this.productoSeleccionado = {
      qty: 1,
      product: product
    }

    // this.productosSeleccionados.push(this.productoSeleccionado)
    console.log(localStorage.getItem('user'))
    console.log(this.newOrder.products)
    this.newOrder.products.push(this.productoSeleccionado)
  }
  newOrder: Order = {
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
    status: '',
    dataEntry: ''
  }


}
