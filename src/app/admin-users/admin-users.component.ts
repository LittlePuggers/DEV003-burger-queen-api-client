import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent {
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
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === editedUser.id) {
        this.users[i] = editedUser;
        console.log(editedUser)
      }

    }
  }
}
