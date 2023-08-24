import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, productType } from '../data-type';
import { Observable, observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  /**
   * Hold the Quentity of the product To added
   * @type {number |undefined}
   * @memberof ProductService
   */
  Quentity: number | undefined;

  // EventEmitter for reflecting  cart data changes.
  cartData = new EventEmitter<productType[] | []>();

  /**
   * create a instance of ProductService.
   * @param {HttpClient} http  - The HttPClient service to perform http request service.
   */
  constructor(private http: HttpClient) { }

  /**
   * Add a product to a DataBase.
   * @param {productType} data -The product data to be added.
   * @method addProduct
   * @memberof ProductService
   * @returns {any} - the response From the API.
   */
  addProduct(data: productType): any {
    return this.http.post('environment.productUrl', data);
  }

  /**
   * Retrieves a list of the product from the database.
   * @memberof ProductService
   * @method productList
   * @returns {Observable<productType[]>} - An observable containing the list of products.
   */
  productList(): Observable<productType[]> {
    return this.http.get<productType[]>(environment.productUrl);
  }

  /**
   * 
   * @memberof ProductService
   * @method deleteProduct
   * @param {number} id - The ID of the product to be deleted. 
   * @returns {any} - The response from the data.
   */
  deleteProduct(id: number): any{
    return this.http.delete(`${environment.productUrl}/${id}`)
  }

  /**
   * Retrieves a Search product bassed on the product Id
   * @memberof ProductService
   * @method getProduct
   * @param id -The Id of the product To fatchs
   * @returns {Observable<productType>} - An observable containing the  products based on Product ID.
   */
  getProduct(id: string): Observable<productType> {
    return this.http.get<productType>(`${environment.productUrl}/${id}`);
  }

  /**
   * Retrieves a Popular Product.
   * @memberof ProductService
   * @method popularProduct
   */
  popularProduct(){
    return this.http.get<productType[]>(`${environment.productUrl}?_limit=3`);
  }

  /**
   * Retrieves a Trendy Product
   * @memberof ProductService
   * @method trendyProduct
   */
  trendyProduct() {
    return this.http.get<productType[]>(`${environment.productUrl}?_limit=8`)
  }

  /**
   * Search the product on the bassed of provided query.
   * @param {String} query - Hold the Data input enter by the user Search.  
   * @memberof ProductService
   * @method searchProduct
  
   */
  searchProduct(query: string){
    return this.http.get<productType[]>(`${environment.productUrl}?q=${query}`);
  }


  /**
   * Add a product to local Storage/cart.
   * @memberof ProductService
   * @method localAddToCart
   * @param  {productType}data -The product to be added to the cart.
   * @returns {void}
   */
  localAddToCart(data: productType): void {
    let cartData = [];
    let localCart = localStorage.getItem('localCart')
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData)
  }

  /**
   * Add a product to the server using an API request.
   * @param {cart} cartData The product and user information to be added to the database cart.
   * @method addToCart
   * @memberof ProductService
   */
  addToCart(cartData: cart) {
    return this.http.post(environment.cartUrl, cartData);
  }

  /**
  * Retrieves the user's cart list from the data server using an API request.
  * @memberof ProductService
  * @method getCartList
  * @param {number} userId - The ID of the user whose cart is being retrieved.
  * @returns {any} -reponse from The API 
  */
  getCartList(userId: number): any {
    return this.http.get<productType[]>(`${environment.cartUrl}?userId=${userId}`+ userId, {
      observe: 'response'
    }).subscribe((result) => {
      if (result && result.body) {
        this.cartData.emit(result.body);
      }
    })
  }

}
