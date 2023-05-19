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
  timerSubscription: Subscription = new Subscription;

  startTimer(order: Order): void {
    this.timerSubscription = interval(60000).subscribe(() => {
      order.timer++; // Incrementa el temporizador en 1 minuto
    });
  }

  ngOnInit(): void {
    this.http.get(this.api).subscribe((response: any) => {
      console.log(response);
      for (let i = 0; i < response.length; i++) {
        if (response[i].status === "Pendiente") {
          response[i].dataEntry = new Date(response[i].dataEntry); // Convierte la cadena en un objeto Date
          response[i].timer = this.calculateTimeDifference(response[i].dataEntry); // Calcula la diferencia en minutos
          this.orders.push(response[i]);
          this.startTimer(response[i]); // Inicia el temporizador para la orden
        }
      }
      this.ref.detectChanges();
    });
  }

  calculateTimeDifference(dataEntry: Date): number {
    const now = new Date();
    const diffInMilliseconds = now.getTime() - dataEntry.getTime();
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    return diffInMinutes;
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {hour: "2-digit", minute: "2-digit", second: "2-digit"};   
    return date.toLocaleString(undefined, options).replace(',', ''); 
  }

  changeStatus(order: Order) {
    const body = { status: "Preparado" }
    this.http.patch(this.api + '/' + order.id, body).subscribe(()=>{
      this.http.get(this.api).subscribe((response: any) => {
        console.log(response);
        this.orders = response.filter((order: any) => order.status === "Pendiente");
        this.ref.detectChanges();
      });
      if (this.timerSubscription) {
        this.timerSubscription.unsubscribe(); // Cancela la suscripción al temporizador
      }
    });
  }

}

