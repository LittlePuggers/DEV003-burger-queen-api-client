import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { NgModel } from '@angular/forms';
import { Product } from '../interfaces/producto';
import { Order } from '../interfaces/orden';
import { ProductOrder } from '../interfaces/productOrder';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  productoSeleccionado: any;
  clientName = '';
  onBlur(value: string) {
    this.clientName = value;
    // console.log(this.clientName)
    this.newOrderClient.emit(this.clientName)

  }
  @Input() productsSelected!: ProductOrder[];
  @Input() precioTotalOrden!: number;
  @Output() newOrderClient = new EventEmitter<string>;
  @Output() decrease = new EventEmitter<ProductOrder>();
  @Output() increase = new EventEmitter<ProductOrder>();
  @Output() delete = new EventEmitter<ProductOrder>();

  constructor(private http: HttpClient) {

  }

  minusQty(productoSeleccionado: ProductOrder) {
    this.decrease.emit(productoSeleccionado);
  }

  plusQty(productoSeleccionado: ProductOrder){
    this.increase.emit(productoSeleccionado)
  }

  deleteProduct(productoSeleccionado: ProductOrder){
    this.delete.emit(productoSeleccionado)
  }
}
