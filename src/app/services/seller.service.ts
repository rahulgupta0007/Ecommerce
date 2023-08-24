import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { SignUp, loginup } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class SellerService {
  //  This BehaviorSubject will hold the user's login statush
  isSellerLoggedIn = new BehaviorSubject<boolean>(false)

  //EventEmitter for reflecting the Auth-error message
  isloginError = new EventEmitter<boolean>(false)


  /**
   * create a instance of a sellerService
   * @param http - The http request for HttpClient response
   * @param router - -router for navigation
   */
  constructor(private http: HttpClient, private router: Router) { }

  /**
   * method for the Registers a new user..
   * @method userSignUp
   * @memberof SellerService
   * @param {Signup} data - The seller details to be signup
   * @returns {void}
   */
  userSignUp(data: SignUp): void {
    this.http.post(environment.sellerUrl, data, { observe: 'response' }
    ).subscribe((result) => {
      this.isSellerLoggedIn.next(true);
      // To store a data in localStorage
      localStorage.setItem('seller', JSON.stringify(result.body));
      this.router.navigate(['seller-home']);
      console.warn('result', result);
    });

  }
  /**
   * redirect to seller home page if seller is already login
   * @memberof sellerService
   * @method reloadSeller
   */
  reloadSeller() {
    if (
      localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);

    }
  }
  /**
 * Authenticates the user and logs them in..
 * @method userLoginUp
 * @memberof SellerService
 * @param {loginup} data - The seller details to be Login
 * @returns {void}
 */
  userLoginUp(data: loginup): void {
    console.warn(data)
    this.http.get(`${environment.sellerUrl}?email=${data.email}&password=${data.password}`,
      { observe: 'response' }
    ).subscribe((result: any) => {
      console.warn(result)
      if (result && result.body && result.body.length) {
        console.warn("user logged-in")
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      }
      else {
        console.warn("login faild");
        this.isloginError.emit(true)
      }

    })
  }
}
