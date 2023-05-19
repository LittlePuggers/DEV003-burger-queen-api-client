import { Component, ChangeDetectorRef } from '@angular/core';
import { Order } from '../interfaces/orden';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';

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
    this.http.get(this.api).subscribe((response: any) => {       
      console.log(response);       
      this.orders = response.filter((order: any) => order.status === "Pendiente");       
      this.orders.forEach((order: Order) => {         
        order.dataEntry = new Date(order.dataEntry);         
        order.timer = this.calculateTimeDifference(order.dataEntry);         
        this.startTimer(order);       
      });       
      this.ref.detectChanges();     
    });   
  }

  startTimer(order: Order): void {     
    const timerSubscription = interval(60000).subscribe(() => {       
      order.timer++;       
      this.ref.detectChanges(); // Forzar la detección de cambios después de actualizar el temporizador     
    });     
    order.timerSubscription = timerSubscription;   
  }

  calculateTimeDifference(dataEntry: Date): number {
    const now = new Date();
    const diffInMilliseconds = now.getTime() - dataEntry.getTime();
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    return diffInMinutes;
  }

  changeStatus(order: Order) {
    const body = { status: "Preparado" };
    this.http.patch(this.api + '/' + order.id, body).subscribe(()=>{
      order.status = "Preparado"; // Actualizar el estado de la orden seleccionada
      if (order.timerSubscription) {         
        order.timerSubscription.unsubscribe();       
      }
  });

      this.http.get(this.api).subscribe((response: any) => {
        console.log(response);
        this.orders = response.filter((order: any) => order.status === "Pendiente");
        this.ref.detectChanges();
      });
    //   if (this.timerSubscription) {
    //     this.timerSubscription.unsubscribe(); // Cancela la suscripción al temporizador
    //   }
    // });
  }

  formatDate(date: Date): string {
    const options: any = {hour: "2-digit", minute: "2-digit", second: "2-digit"};   
    return date.toLocaleString(undefined, options).replace(',', ''); 
  }

  formatTime(minutes: number): string {
    const mins = String(minutes % 60).padStart(2, '0');
    const hours = String(Math.floor(minutes / 60)).padStart(2, '0');
    return `${hours}:${mins}`;
  }

  stopTimer(order: Order): void {
    if (order.timerSubscription) {
      order.timerSubscription.unsubscribe(); // Cancelar la suscripción al temporizador
    }
  }

  

}

