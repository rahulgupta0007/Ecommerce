import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SellerService } from './services/seller.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private sellerService: SellerService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.sellerService.isSellerLoggedIn.pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          return true; // Allow navigation to seller-home
        } else {
          // Not logged in, redirect to seller-auth
          this.router.navigate(['/seller-auth']);
          return false;
        }
      })
    );
  }
}