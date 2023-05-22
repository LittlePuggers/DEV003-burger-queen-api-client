import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
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

  editedUser: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user']) {
      this.editedUser = { ...this.user };
    }
  }

  onClose() {
    this.close.emit();
  }
  onUserEdit() {
    const editedUser = { ...this.editedUser };
    this.userEdited.emit(editedUser); //Habiamos comentado esta línea
  }

}


