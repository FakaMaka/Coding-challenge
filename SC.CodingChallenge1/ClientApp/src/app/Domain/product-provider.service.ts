import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product-model';

@Injectable()
export class ProductProvider {

  private _item: Product;

  constructor(
    @Inject('BASE_URL')
    private _baseUrl: string,
    private _http: HttpClient) {

  }

  public getProductById(id: number): Promise<Product>  {

    return this._http.get<Product>(this._baseUrl + 'api/ProductList/' + id).toPromise();
  }

  public getProducts(): Promise<Product[]> {

    return this._http.get<Product[]>(this._baseUrl + 'api/ProductList/Get').toPromise();
  }
}
