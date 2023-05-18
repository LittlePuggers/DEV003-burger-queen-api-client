import { Component, ChangeDetectorRef } from '@angular/core';
import { Order } from '../interfaces/orden';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.css']
})


export class ChefComponent {
  api: string = 'http://localhost:3000/orders';
  constructor(private http: HttpClient, private ref: ChangeDetectorRef) {
  }
  orders: any

  ngOnInit(): void {
    this.orders = []
    this.http.get(this.api).subscribe(
      (response: any) => {
        console.log(response)
        for (let i = 0; i < response.length; i++) {
          if (response[i].status === "Pendiente") {
            this.orders.push(response[i])
          }
        };
        this.ref.detectChanges();
      }
    )
  }
  changeStatus() {
    const body = { status: "Preparado" }
    for (let i = 0; i < this.orders.length; i++) {
      if (this.orders[i].status === "Pendiente") {
        this.http.patch(this.api + "/" + this.orders[i].id, body).subscribe()
      }
    }
  }
}