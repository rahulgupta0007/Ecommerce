import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { productType } from '../data-type';

// for displaying Search Product 
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  /**
   * Create a instance for SearchComponent
   * @param {ActivatedRoute}activeRoute 
   * @param {ProductService} product 
   */
  constructor(private activeRoute:ActivatedRoute, private product:ProductService){}

  /**
   * store thesearch product Details 
   * @memberof SearchComponent
   * @type {undefined | productType}
   */
  searchresult:undefined|productType[]
 
  /**
   * * Lifecycle hook: Initializes the component.
   * Fetches search result from the service.
   * @memberof SearchComponent
   * @returns {void}
   */
  ngOnInit(): void {

    /**
     * store the input entered by the user 
     * @memberof SearchComponent
     * @type {string | undefined}
     */
  let query = this.activeRoute.snapshot.paramMap.get('query');
  if(query){
    /**
     * fetch search result bassed on the query
     * @param {sting} query - the search query entered by the user
     */
    query &&  this.product.searchProduct(query).subscribe((data)=>{
    this.searchresult=data;
    console.warn(this.searchresult);
   });
  }
 }
}
