import { EventEmitter, Injectable } from '@angular/core';
import { SignUp, loginup, userSignup } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //  This BehaviorSubject will hold the user's login status
  isUserLoggedIn = new BehaviorSubject<boolean>(false)

  /**
   * create a instance of a userService
   * @param http - The http request for HttpClient response
   * @param router - -router for navigation
   */
  constructor(private http: HttpClient, private router: Router) { }

  //EventEmitter for reflecting the Auth-error message.
  invaildUserAuth = new EventEmitter<boolean>(false)


  /**
   * method for the Registers a new user..
   * @method userSignUp
   * @memberof UserService
   * @param {userSignup} data - The user details to be signup
   * @returns {void}
   */
  userSignUp(data: userSignup): void {
    this.http.post(environment.userUrl, data, { observe: 'response' }
    ).subscribe((result) => {
      this.isUserLoggedIn.next(true);
      // To store a data in localStorage
      localStorage.setItem('user', JSON.stringify(result.body));
      this.router.navigate(['/']);
      console.warn(data)
    })

  }

  /**
    * Authenticates the user and logs them in.
    * @method userLoginUp
    * @param {loginup} data - The user login data.
    * @memberof UserService
    * @return {void}
    */
  userLoginUp(data: loginup) {
    this.http.get<SignUp[]>(`${environment.userUrl}?email=${data.email}&password?=${data.password}`,
      { observe: 'response' }
    ).subscribe((result) => {
      if (result && result.body && result.body.length) {
        console.warn("user logged-in")
        this.invaildUserAuth.emit(false);
        localStorage.setItem('user', JSON.stringify(result.body[0]));
        this.router.navigate(['/']);
      }
      else {
        console.warn("login faild");
        this.invaildUserAuth.emit(true)
      }
    })
  }

  /**
   * Redirects to the home page if the user is already authenticated.
   * @method userAuthRoute
   * @memberof UserService
   * @return {void}
   */
  userAuthRoute(): void {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/'])
    }
  }

}

