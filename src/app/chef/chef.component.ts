import { Component, ChangeDetectorRef } from '@angular/core';
import { Order } from '../interfaces/orden';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.css']
})

export class ChefComponent {
  constructor(private http: HttpClient, private ref: ChangeDetectorRef) {}

  api: string = 'http://localhost:3000/orders';
  orders: Order[] = []

  ngOnInit(): void {
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

  changeStatus(order: Order) {
    const body = { status: "Preparado" }
    this.http.patch(this.api + '/' + order.id, body).subscribe(()=>{
      this.ngOnInit()
    });
  }

}