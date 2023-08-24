import { Component } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { productType } from '../data-type';

/**
 * component for adding product by seller
 * @memberof SellerAddProductComponent
 */
@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
 
  /**
   * create a instance of SellerAddProductComponent
   * @param {ProductService} product
   * @memberof SellerAddProductComponent
   */
  constructor(private product:ProductService){}

  /**
   * Form Group For Adding a new Product
   * @type {FormGroup}
   */
  addsellerproduct = new FormGroup({
    productName: new FormControl('',Validators.required),
    productPrice: new FormControl('',Validators.required),
    productCategory: new FormControl('',Validators.required),
    productDiscription: new FormControl('',Validators.required),
    productImageUrl: new FormControl('',Validators.required),
    productColor: new FormControl(''),
  })

   /**
    * Gets the validity status of the products form control
    * @type {FormControl}
    */
    get vaildProductName(){
    return this.addsellerproduct.get("productName")
    }
    get vaildProductPrice(){
    return this.addsellerproduct.get("productPrice")
   }
    get vaildProductColor(){
    return this.addsellerproduct.get("productColor")
    }
    get vaildProductDiscription(){
    return this.addsellerproduct.get("productDiscription")
   }
    get vaildProductCategory(){
    return this.addsellerproduct.get("productCategory")
    }
    get vaildProductImageUrl(){
    return this.addsellerproduct.get("productImageUrl")
   }
 

  /**
   * message display after adding Product
   * @type {string | undefined}
   */
  addproductMessage:string|undefined;

  /**
   * Add new product by product Service
   * @param data
   * @type {productType}
   * @memberof SellerAddProductComponent
   * @returns {void} 
   */
  sellerAddProduct(data:any){
   this.product.addProduct(data).subscribe(((result: any)=>{
    console.warn(result);
   if(result){
    this.addproductMessage= "product add succussfully";

    //clear data field of form after sucessfully added product
    this.addsellerproduct.reset(); 
  }
  setTimeout(() => (this.addproductMessage= undefined), 3000); 
}))
}

}