import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { User } from '../interfaces/user';

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
  @Output() userEdited = new EventEmitter<User>();

  onClose() {
    this.close.emit();
  }
  onUserEdit() {
    // Aquí es donde harías la edición de tu usuario.
    const editedUser = { ...this.user, name: '', email: "hola", rol: "holi" };
    this.userEdited.emit(editedUser);  // Luego, emites el evento con el usuario editado.
  }
}

