import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductProvider } from '../domain/product-provider.service';
import { ProductUpdater } from '../domain/product-updater.service';
import { Product } from '../domain/product';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  item: Product = new Product();

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _productProvider: ProductProvider,
    private _productUpdater: ProductUpdater,
  ) {
  }

  ngOnInit() {
    var itemId;
    this._route.params.subscribe(params => {
      itemId = + params['itemId'];
    });
    if (typeof itemId === 'number') {
      this._productProvider.getProductById(itemId).then(result => this.item = result, error => console.error(error));
    }
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
