import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { User } from '../interfaces/user';
import { EditedUser } from '../interfaces/editedUser'

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent {
  userService: any;
  constructor(private http: HttpClient, private ref: ChangeDetectorRef) { }
  users: any[] = []
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

  reciboUsuario(editedUser: EditedUser) {
    console.log('reciboUsuario fue llamado con:', editedUser);
    const index = this.users.findIndex(user => user.id === editedUser.id);
    if (index !== -1) {
      this.http.put(`${this.api}/${editedUser.id}`, editedUser).subscribe(response => {
        if (response) {
          this.users[index] = response as EditedUser;
          this.ref.detectChanges();  // Detecta los cambios en el navegador
        }
      }, error => {
        console.error('Error al actualizar el usuario:', error);
      });
      this.closeModal()
    }

  }

  eliminarUsuario(userId: string) {
    this.http.delete(this.api + "/" + userId).subscribe(
      (response) => {
        const index = this.users.findIndex(user => user.id === userId);
        if (index !== -1) {
          this.users.splice(index, 1);
        }
        console.log('Usuario eliminado:', response);
        this.ref.detectChanges();
      }
    )
  }
  newUser: User = {
    name: "",
    rol: "",
    email: "",
    password: "",
    id: ""
  }

  agregarUsuario(addUser: User) {
    console.log('reciboUsuario fue llamado con:', addUser);
    const index = this.users.findIndex(user => user.id === addUser.id); {
      console.log(index)
      this.http.post(this.api, addUser).subscribe(
        (response) => {
          console.log(response)
          this.users = [...this.users, this.newUser]

          this.ref.detectChanges();
        }, error => {
          console.error('Error al actualizar el usuario:', error);
        });
      this.closeModal()
    }
  }
}
