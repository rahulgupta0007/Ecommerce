import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { productType } from '../data-type';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

/**
 * Header component for the application.
 * @memberof app-header
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  // Variables to store menu type and user/seller names
  menutype: string = "";
  sellerName: string = "";
  userName: string = "";
  private subscription = new Subscription();

  // Variables for search results and cart items count
  searchResult: productType[] | undefined;
  cartItems: number | undefined;

  constructor(
    private router: Router,
    private product: ProductService,
    private user: UserService
  ) {}
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  /**
   * Lifecycle hook that runs when the component is initialized.
   * Subscribes to router events and fetches cart data.
   * @memberof HeaderComponent
   * @returns {void}
   */
  ngOnInit(): void {
    this.subscribeToRouterEvents();
    this.updateCartItemsCount();
  }

  /**
   * Subscribe to router events to determine menu type and user/seller names.
   * @memberof HeaderComponent
   * @returns {void}
   */
  private subscribeToRouterEvents(): void {
    this.subscription.add(this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          // Handling seller menu
          const sellerStore = localStorage.getItem('seller');
          const sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.user;
          this.menutype = 'seller';
        } else if (localStorage.getItem('user')) {
          // Handling user menu
          const userStore = localStorage.getItem('user');
          const userData = userStore && JSON.parse(userStore);
          this.userName = userData.user;
          this.menutype = 'user';
          this.product.getCartList(userData.id);
        } else {
          // Default menu
          this.menutype = 'default';
        }
      }
    }));
  }

  /**
   * Update cart items count.
   * @memberof HeaderComponent
   * @returns {void}
   */
  private updateCartItemsCount(): void {
    const cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }
    this.product.cartData.subscribe((data) => {
      this.cartItems = data.length;
    });
  }

  /**
   * Logout the seller and navigate to the seller authentication page.
   * @memberof HeaderComponent
   */
  sellerLogout(): void {
    localStorage.removeItem('seller');
    this.router.navigate(['/seller-auth']);
  }

  /**
   * Logout the user, navigate to the home page, and clear cart data.
   * @memberof HeaderComponent
   */
  userLogout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
    this.product.cartData.emit([]);
  }

  /**
   * Search for products based on user input.
   * @param query - The KeyboardEvent containing the user's search query.
   * @memberof HeaderComponent
   */
  searchProduct(query: KeyboardEvent): void {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((data) => {
        if (data.length > 5) {
          data.length = 5;
        }
        this.searchResult = data;
      });
    }
  }

  /**
   * Hide search results.
   * @memberof HeaderComponent
   */
  hideSearch(): void {
    this.searchResult = undefined;
  }

  /**
   * Perform search based on user input and navigate to the search results page.
   * @param val - The search query entered by the user.
   * @memberof HeaderComponent
   */
  submitSearch(val: string): void {
    this.router.navigate([`search/${val}`]);
  }

  /**
   * Redirect to details page for a specific product.
   * @param id - The ID of the product to navigate to.
   * @memberof HeaderComponent
   */
  redirectToDetails(id: number): void {
    this.router.navigate(['/details/' + id]);
  }
}
