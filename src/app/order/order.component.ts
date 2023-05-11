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
  clientName = '';
  onBlur(value: string) {
    this.clientName = value;
    // console.log(this.clientName)
    this.newOrderClient.emit(this.clientName)

  }
  @Input() productsSelected!: ProductOrder[]
  @Output() newOrderClient = new EventEmitter<string>

  constructor(private http: HttpClient) {

  }


}
