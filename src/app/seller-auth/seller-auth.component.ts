import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp, loginup } from '../data-type';

/**
 * component for seller signup/Login
 * @memberof SellerAuthComponent
 */
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {

  /**
   * create instance of SellerAuthCmponent
   * @param {SellerService} seller -the SellerService for handling seller reslated operation
   * @param {Router} router -router for navigation
   */
  constructor(private seller: SellerService, private router: Router) { }


  /**
   * method for seller signing up
   * @memberof SellerAuthCmponent
   * @param data -the data conatining user input for signup
   * @returns {void}
   */
  signup(data: any): void {
    this.seller.userSignUp(data)
  }

  /**
   * variable to hold the error massage
   * @type {String}
   */
  autherror: string = ""

  /**
   * handles login for the seller
   * @param  {any} data
   * @memberof SellerAuthCmponent
   * @returns {void} 
   */
  loginup(data: any): void {
    this.autherror = "";
    this.seller.userLoginUp(data)
    this.seller.isloginError.subscribe((error) => {
      if (error) {
        this.autherror = "email or password are in-correct";
      }
    })
  }


  /**
   * method to check if data is stored in local storage and redirect a
   */
  ngOnInit(): void {
    this.seller.reloadSeller()
  }

  /**
   * Form Group for seller signup
   * @type {FormGroup}
   */
  signUpForm = new FormGroup({
    user: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email)
  })
  /**
* Form Group for seller LoginUp
* @type {FormGroup}
*/
  loginUpForm = new FormGroup({
    password: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email)
  })
  /**
   * Getters for form validation
   *  @type {FormControl}
   * */
  get uservalid() {
    return this.signUpForm.get("user")
  }
  get passwordvalid() {
    return this.signUpForm.get("password")
  }
  get emailvalid() {
    return this.signUpForm.get("email")
  }


  // variable to store boolean result 
  checkpage = false


  /**
   * Toggles to show the signup form.
   * @memberof UserAuthComponent
   * @returns {void}
   */
  showLogin() {
    this.checkpage = true;
  }

  /**
   * Toggles to show the login form.
   * @memberof UserAuthComponent
   * @returns {void}
   */
  showSignup() {
    this.checkpage = false;
  }

}
