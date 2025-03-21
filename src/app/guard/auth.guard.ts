import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import { MutualFundServiceService } from '../mutual-fund-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private service: MutualFundServiceService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (localStorage.getItem('token') != null && localStorage.getItem('token') != '') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  handleSessionTimeout() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const exp = decodedToken.exp;
      const remainingTime = exp * 1000 - Date.now();
      console.log("check remining time : ",remainingTime);
      if (remainingTime > 0) {
        setTimeout(() => {
          this.logout();
        }, remainingTime);
      } else {
        this.logout();
      }
    }
  }


  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    let val = 'null';
    this.service.sendRefresh(val);
    window.location.href = '/login';
  }
}