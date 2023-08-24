import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUp, cart, productType, userSignup } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

/**
 * component for add User and login.
 * @memberof UserAuthComponent
 */
@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {

  /**
   * create a instance for Seller home component.
   * @memberof UserAuthComponent 
   * @param {ProductService} product - The product service To handle the product related operation.
   * @param {UserService} user - the userService To handle the user related operation.
   * 
   */
  constructor(private user: UserService, private product: ProductService) { }

  /**
    * Lifecycle hook that runs when the component is initialized.
    * Initializes user authentication route.
    * @memberof UserAuthComponent
    * @returns {void}
    */
  ngOnInit(): void {
    this.user.userAuthRoute()
  }

  /**
* Form Group for user Signup.
* @memberof UserAuthComponent
* @type {FormGroup}
*/
  userSignUp = new FormGroup({
    user: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email)

  })

  /**
   * Form Group for user LoginUp.
   * @memberof UserAuthComponent
   * @type {FormGroup}
   */
  userLoginup = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.required)
  })

  /**
   * Getters for form validation.
   *  @type {FormControl}
   * */
  get loginEmailvalid() {
    return this.userLoginup.get("email")
  }
  get loginPassword() {
    return this.userLoginup.get("password")
  }
  get uservalid() {
    return this.userSignUp.get("user")
  }
  get passwordvalid() {
    return this.userSignUp.get("password")
  }
  get emailvalid() {
    return this.userSignUp.get("email")
  }

  /**
 * Method for user signup.
 * @param {any} data - The data containing user input for signup.
 * @memberof UserAuthComponent
 * @returns {void}
 */
  signUp(data: any) {
    this.user.userSignUp(data)
  }



  /**
   * variable to hold the login error massage.
   * @type {string}
   */
  autherror: string = ""
  /**
   * Handles user login.
   * @param {any} data - The data containing user input for login.
   * @memberof UserAuthComponent
   * @returns {void}
   */
  loginUp(data: any) {
    this.user.userLoginUp(data)
    this.user.invaildUserAuth.subscribe((result) => {
      console.log(result);
      if (result) {
        this.autherror = "email or password are in-correct"
        console.log("not working")
      } else {
        this.localCartToRemoteCart()
        console.log(" localCartToRemoteCart called")
      }
    })
  }

  // variable to store boolean result.
  checkpage = false

  /**
   * Toggles to show the login form.
   * @memberof UserAuthComponent
   * @returns {void}
   */
  showLogin() {
    this.checkpage = true;
  }

  /**
   * Toggles to show the signup form.
   * @memberof UserAuthComponent
   * @returns {void}
   */
  showSignup() {
    this.checkpage = false;
  }

   /**
   * Moves items from local cart to remote cart and handles synchronization.
   * @memberof UserAuthComponent
   * @returns {void}
   */
  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: productType[] = JSON.parse(data);


      cartDataList.forEach((product: productType, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId,
        };
        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.log("item saved in db");
            }
          })
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 500);
      });
    }

   // Set a timeout message for cart synchronization.
    setTimeout(() => {
      this.product.getCartList(userId);
    }, 2000);

  }
}
