import { Component, EventEmitter, Output } from '@angular/core';
import { Product } from '../interfaces/producto';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @Output() productoSeleccionado = new EventEmitter<Product>

  recibeProducto(product:Product) {
    this.productoSeleccionado.emit(product)
  }

}
