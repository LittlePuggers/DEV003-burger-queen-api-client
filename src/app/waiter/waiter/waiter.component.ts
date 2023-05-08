import { Component, EventEmitter, Output } from '@angular/core';
import { Product } from 'src/app/interfaces/producto';

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.css']
})
export class WaiterComponent {
  // @Output() productoSeleccionado = new EventEmitter<Product>

productoSeleccionado!: Product 

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
    // this.productoSeleccionado.emit(this.productSelected)
    console.log('recibo en waiter:', this.productoSeleccionado)
  }
}

// crear funcion reciboProducto (clg para checar paso a paso)
// implementar un input para enviar al hijo con @Input
// componente Order llama @Input y Waiter (el padre) enviar el dato con etiqeuta 
// en componente Order hacer console log para corroborar, mostrar con ngFor los elementos del array