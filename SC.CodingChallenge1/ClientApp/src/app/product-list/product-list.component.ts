import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Product } from '../Domain/product-model';
import { ProductProvider } from '../Domain/product-provider.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  public products: Product[];

  constructor(
    http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private _router: Router,
    private _productProvider: ProductProvider, ) {
    this._productProvider.getProducts().then(result => {
      this.products = result;
    }, error => console.error(error));
  }
}
