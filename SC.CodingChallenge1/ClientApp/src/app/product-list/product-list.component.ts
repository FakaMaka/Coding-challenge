import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Product } from '../domain/product';
import { ProductProvider } from '../domain/product-provider.service';
import { ProductUpdater } from '../domain/product-updater.service';

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
    private _productProvider: ProductProvider,
    private _productUpdater: ProductUpdater,) {
    this._productProvider.getProducts().then(result => {
      this.products = result;
    }, error => console.error(error));
  }

  async deleteProduct(itemId: number) {
    await this._productUpdater.deleteProduct(itemId);
    location.reload();
  }
}
