import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent {
  userService: any;
  constructor(private http: HttpClient, private ref: ChangeDetectorRef) { }
  users: User[] = []
  api: string = 'http://localhost:3000/users';

  ngOnInit(): void {
    this.http.get(this.api).subscribe((response: any) => {
      console.log(response);
      this.users = response;

    });

  }
  isModalVisible = false;
  selectedUser: any;
  openModal(user: User) {
    this.selectedUser = user;
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  reciboUsuario(editedUser: User) {
    console.log('reciboUsuario fue llamado con:', editedUser);
    const index = this.users.findIndex(user => user.id === editedUser.id);
    if (index !== -1) {
      this.http.put(`${this.api}/${editedUser.id}`, editedUser).subscribe(response => {
        if (response) {
          this.users[index] = response as User;
          this.ref.detectChanges();  // Detecta los cambios en el componente
        }
      }, error => {
        console.error('Error al actualizar el usuario:', error);
      });
    }
  }

}
