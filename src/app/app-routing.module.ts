import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartComponent } from './cart/cart.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'seller-auth',
    component: SellerAuthComponent
  },
  {
    component: SellerHomeComponent,
    path: 'seller-home',
    canActivate:[AuthGuard]
    
  },
  {
    component: SellerAddProductComponent,
    path: 'seller-add-product',
    canActivate:[AuthGuard]
  },{
    component: SearchComponent,
    path: 'search/:query'
  },{
    component: ProductDetailsComponent,
    path: 'details/:productId'
  },{
    component: UserAuthComponent,
    path: 'user-auth'
  },{
    component: CartComponent,
    path: 'app-cart'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
