import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductProvider } from '../Domain/product-provider.service';
import { ProductUpdater } from '../Domain/product-updater.service';
import { Product } from '../Domain/product-model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  item: Product = new Product();
  editProduct: Product = new Product();
  private _itemId: number;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _productProvider: ProductProvider,
    private _productUpdater: ProductUpdater,
  ) {
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this._itemId = + params['itemId'];
    });
    if (this._itemId != 0) {
      this._productProvider.getProductById(this._itemId).then(result => this.item = result, error => console.error(error));
    }
  }

  async deleteProduct(itemId: number) {
    await this._productUpdater.deleteProduct(itemId);
    this._router.navigate(['/']);
  }

  async onSubmit(form: NgForm) {
    if (form.value.id !=null) {
      await this._productUpdater.updateProductDetails(form.value.id, form.value);
    }
    else {
      await this._productUpdater.addProduct(form.value);
    }
    this._router.navigate(['/']);
  }

}
