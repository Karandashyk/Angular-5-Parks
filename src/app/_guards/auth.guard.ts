import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isLoggedIn
      .take(1)
      .map((isLoggedIn: boolean) => {
        if (isLoggedIn || localStorage.getItem('currentUser')) {
          return true;
        } else { this.router.navigate(['/login']); }
        return false;
      });
  }

  //   if (localStorage.getItem('currentUser')) {
  //     // logged in so return true
  //     return true;
  //   }
  //
  //   // not logged in so redirect to login page
  //   this.router.navigate(['/login']);
  //   return false;
  // }
}
