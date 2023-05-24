import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { User } from '../interfaces/user';
import { EditedUser } from '../interfaces/editedUser';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})

export class ModalComponent {
  @Input()
  isVisible: boolean = false;
  @Input() user: any;
  @Output() close = new EventEmitter();
  @Output() userEdited = new EventEmitter<EditedUser>();
  @Output() userAdded = new EventEmitter<User>();

  editedUser: EditedUser = {
    name: '',
    email: '',
    rol: '',
    id: '',
  };
  addUser: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user']) {
      this.editedUser = { ...this.user };
      
    }
  }

  onClose() {
    this.close.emit();
  }
  onUserEdit() {
    const editedUser: EditedUser = {
      name: this.editedUser.name,
      email: this.editedUser.email,
      rol: this.editedUser.rol,
      id: this.user.id
    };
    console.log('editado', editedUser)
    this.userEdited.emit(editedUser);
  }
  onUserAdd() {
    const addUser: User = {
      name: this.editedUser.name,
      email: this.editedUser.email,
      rol: this.editedUser.rol,
      id: '',
      password: this.user.password
    }
    console.log(addUser)
    this.userAdded.emit(addUser);
   
  }
}


