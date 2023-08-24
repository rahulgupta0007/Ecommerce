import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { productType } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /**
   * List of popular products.
   * @memberof HomeComponent
   * @type {productType[] | undefined}
   */
  popularProduct: productType[] | undefined;

  /**
   * List of trendy products.
   * @memberof HomeComponent
   * @type {productType[] | undefined}
   */
  trendyProduct: productType[] | undefined;
  
  constructor(private product: ProductService) {}

  /**
   * Lifecycle hook: Initializes the component.
   * Fetches popular and trendy products from the service.
   * @memberof HomeComponent
   * @return {void}
   */
  ngOnInit(): void {
    this.fetchPopularProducts();
    this.fetchTrendyProducts();
  }

  /**
   * Fetches popular products from the service.
   * @memberof HomeComponent
   * @return {void}
   */
  private fetchPopularProducts(): void {
    this.product.popularProduct().subscribe((data) => {
      this.popularProduct = data;
    });
  }

  /**
   * Fetches trendy products from the service.
   * @memberof HomeComponent
   * @return {void}
   */
  private fetchTrendyProducts(): void {
    this.product.trendyProduct().subscribe((data) => {
      this.trendyProduct = data;
    });
  }
}
