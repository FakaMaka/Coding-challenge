import { Component } from '@angular/core';
import { ProductUpdater } from './domain/product-updater.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    private _updater: ProductUpdater,
    private toastr: ToastrService,) {

    this._updater.updated$.subscribe(() => {
      this.toastr.success('Product Details Updated Successfully!', 'Product Updated', {
        positionClass: 'toast-bottom-right'
      });
    });

    this._updater.added$.subscribe(() => {
      this.toastr.info('Product Added Successfully!', 'Product Added', {
        positionClass: 'toast-bottom-right'
      });
    });

    this._updater.deleted$.subscribe(() => {
      this.toastr.warning('Product Deleted Successfully!', 'Product Deleted', {
        positionClass: 'toast-bottom-right'
      });
    });
  }
}
