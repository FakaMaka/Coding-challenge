import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product-model';
import { Observable, Subject, ReplaySubject } from 'rxjs';

@Injectable()
export class ProductUpdater {
  private _subjectUpdate: Subject<number> = new ReplaySubject<number>(1);
  private _subjectAdd: Subject<number> = new ReplaySubject<number>(1);
  private _subjectDelete: Subject<number> = new ReplaySubject<number>(1);

  constructor(
    @Inject('BASE_URL')
    private _baseUrl: string,
    private _http: HttpClient) {
  }

  public updateProductDetails(itemId: number, product: Product): Promise<void> {
    return this._http.put(this._baseUrl + 'api/ProductList/' + itemId, product).toPromise().then(() => {
      this._subjectUpdate.next(product.id);
    });
  }

  public addProduct(product: Product): Promise<void> {
    return this._http.post(this._baseUrl + 'api/ProductList/', product).toPromise().then(() => {
      this._subjectAdd.next(product.id);
    });
  }

  public deleteProduct(itemId: number): Promise<void> {
    return this._http.delete(this._baseUrl + 'api/ProductList/' + itemId).toPromise().then(() => {
      this._subjectDelete.next(itemId);
    });
  }

  public get updated$(): Observable<number> {
    return this._subjectUpdate;
  };

  public get added$(): Observable<number> {
    return this._subjectAdd;
  };

  public get deleted$(): Observable<number> {
    return this._subjectDelete;
  };
}
