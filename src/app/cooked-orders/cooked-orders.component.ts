import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Order } from '../interfaces/orden';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-cooked-orders',
  templateUrl: './cooked-orders.component.html',
  styleUrls: ['./cooked-orders.component.css']
})

export class CookedOrdersComponent {
  constructor(private http: HttpClient, private ref: ChangeDetectorRef, private router: Router, private authService: AuthService) {}

  api: string = 'http://localhost:3000/orders';
  orders: Order[] = []

  ngOnInit(): void {     
    this.http.get(this.api).subscribe((response: any) => {       
      console.log(response);       
      this.orders = response.filter((order: any) => order.status === "Preparado");            
      this.ref.detectChanges();     
    });   
  }

  changeStatus(order: Order) {
    const body = { status: "Entregado" };
    this.http.patch(this.api + '/' + order.id, body).subscribe(() => {
      order.status = "Entregado"; // Actualizar el estado de la orden seleccionada
  
      // Filtrar las órdenes con estado "Pendiente" y mantener el temporizador en las demás órdenes
      this.orders = this.orders.filter((o: Order) => o.status === "Preparado");
        
      this.http.get(this.api).subscribe((response: any) => {
        console.log(response);
        this.orders = response.filter((o: any) => o.status === "Preparado");
        this.ref.detectChanges();
      });
    });
  }

  showMenu(){
    this.router.navigate(['/waiter'])
  }

  handleLogout(){
    this.authService.logout()
  }
}