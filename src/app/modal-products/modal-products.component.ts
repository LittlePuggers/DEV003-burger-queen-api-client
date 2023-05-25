import { Component, EventEmitter, Input, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { EditedUser } from '../interfaces/editedUser';
import { User } from '../interfaces/user';
import { Product } from '../interfaces/producto';

@Component({
  selector: 'app-modal-products',
  templateUrl: './modal-products.component.html',
  styleUrls: ['./modal-products.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalProductsComponent {
  @Input() isVisible: boolean = false;
  @Input() product: Product = {
    id: 0,
    dateEntry: '',
    image: '',
    name: '',
    price: 0,
    type: ''
  };
  @Output() close = new EventEmitter();
  @Output() productEdited = new EventEmitter<Product>();
  @Output() productAdded = new EventEmitter<Product>();

  editedProduct: Product = {
    id: 0,
    dateEntry: '',
    image: '',
    name: '',
    price: 0,
    type: ''
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product']) {
      this.editedProduct = { ...this.product };
    }
  }

  onClose() {
    this.close.emit();
  }

  onProductEdit() {
    const editedProduct: Product = {
      id: this.product.id,
      dateEntry: this.editedProduct.dateEntry,
      image: this.editedProduct.image,
      name: this.editedProduct.name,
      price: this.editedProduct.price,
      type: this.editedProduct.type,
    };
    console.log('editado', editedProduct)
    this.productEdited.emit(editedProduct);
  }

  onProductAdd() {
    const addProduct: Product = {
      id: 0,
      dateEntry: this.editedProduct.dateEntry,
      image: this.editedProduct.image,
      name: this.editedProduct.name,
      price: this.editedProduct.price,
      type: this.editedProduct.type,
    }
    console.log(addProduct)
    this.productAdded.emit(addProduct);
  }
}
