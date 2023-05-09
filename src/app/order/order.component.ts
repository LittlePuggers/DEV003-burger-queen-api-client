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

  @Input() productsSelected!: Product[] 
 

  constructor(private http: HttpClient) {

  } 


}
