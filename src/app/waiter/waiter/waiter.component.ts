import { Component, EventEmitter, Output } from '@angular/core';
import { Product } from 'src/app/interfaces/producto';

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.css']
})
export class WaiterComponent {

productoSeleccionado!: Product 

productosSeleccionados: Product[] = []

productSelected: Product = {
  id: 0,
  dateEntry: '',
  image: '',
  name: '',
  price: 0,
  type: ''
}

  reciboProducto(product: Product){
    this.productoSeleccionado = product
    this.productosSeleccionados.push(this.productoSeleccionado)
  }
}
