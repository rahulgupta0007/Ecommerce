import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { productType } from '../data-type';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

/**
 * component for displaying selller's add product
 * @memberof SellerHomeComponent
 */
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})

export class SellerHomeComponent {
  //bootstrap alias
  icon= faTrash;
  /**
   * variable to hold add product list
   * @type {productType[] | undefined}
   */
  showProductList:undefined | productType[]
  
  /**
   * variable to hold  delete message
   * @type {String | undefined}
   * @memberof SellerHomeComponent
   */
  deleteMessage:undefined |string;
  /**
   * create a instance for Seller home component
   * @param {ProductService} product - To handle the product related operation 
   */
  constructor(private product:ProductService){}

  /**
   * Lifecycle hook that runs when the component is initialized.
   * method to update the add product list
   * @returns {void}
   */
  ngOnInit():void{
   this.updateList()
  }

  /**
   * @memberof SellerHomeComponent
   * method for displaying updated product list
   */
  updateList(){
    this.product.productList().subscribe((result)=>{
      console.warn(result);
      this.showProductList= result;
      })
  }

  /**
   * method to delete the product bu Id
   * @memberof SellerHomeComponent
   * @param id - hold product id
   */
  deleteProduct(id:number){ 
      this.product.deleteProduct(id).subscribe((result: any)=>{
      if(result){
        this.deleteMessage=("Delete item successfully");
      }
        this.updateList()
      })
   // set the timeout message for delete message
    setTimeout(() => {
      this.deleteMessage=undefined
    }, 3000);
  }
}
