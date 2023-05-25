import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../interfaces/producto';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent {
  auth: any;

  constructor(private http: HttpClient, private ref: ChangeDetectorRef, private router: Router, private authService:AuthService) { }

  products: Product[] = []
  api: string = 'http://localhost:3000/products';

  ngOnInit(): void {
    this.http.get(this.api).subscribe((response: any) => {
      console.log(response);
      this.products = response;
    });
  }

  isModalVisible = false;
  isEditModalVisible = false;
  isAddModalVisible = false;
  selectedProduct: any;
  newProduct: Product = {
    id: 0,
    dateEntry: '',
    image: '',
    name: '',
    price: 0,
    type: ''
  }

  openModal(product: Product | null) {
    this.selectedProduct = product;
    this.isEditModalVisible = product !== null;
    this.isAddModalVisible = false;
  }

  openAddModal() {
    this.isEditModalVisible = false;
    this.isAddModalVisible = true;
  }

  closeModal() {
    this.isEditModalVisible = false;

  }

  editarProducto(editedProduct: Product) {
    console.log('editarProducto fue llamado con:', editedProduct);
    const index = this.products.findIndex(product => product.id === editedProduct.id);
    if (index !== -1) {
      editedProduct.dateEntry = new Date().toLocaleString();
      const priceStr = editedProduct.price.toString();
      console.log(typeof editedProduct.price);
      editedProduct.price = parseInt(priceStr);
      this.http.patch(`${this.api}/${editedProduct.id}`, editedProduct).subscribe(response => {
        if (response) {
          console.log(response as Product)
          this.products[index] = response as Product;
          this.ref.detectChanges();  // Detecta los cambios en el navegador
        }
      }, error => {
        console.error('Error al actualizar el producto:', error);
      });
      this.closeModal()
    }
  }

  eliminarProducto(productId: number) {
    this.http.delete(this.api + "/" + productId).subscribe(
      (response) => {
        const index = this.products.findIndex(product => product.id === productId);
        if (index !== -1) {
          this.products.splice(index, 1);
        }
        console.log('Producto eliminado:', response);
        this.ref.detectChanges();
      }
    )
  }

  agregarProducto(addProduct: Product) {
    console.log('agregarProducto fue llamado con:', addProduct);
    addProduct.dateEntry = new Date().toLocaleString();
    this.http.post(this.api, addProduct).subscribe(
        (response: any) => {
          console.log(response);
          console.log(addProduct);
          addProduct.id = response.id;
          console.log('El nuevo id del producto es:', addProduct.id);

          this.products = [...this.products, addProduct]
          this.ref.detectChanges();
          this.closeModal()
        }, error => {
          console.error('Error al agregar el producto:', error);
        });
  }

  showUsers(){
    this.router.navigate(['/adminUsers'])
  }

  handleLogout(){
    this.authService.logout()
  }
}
