import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class GuardsClientService implements CanActivate{
  routeURL: String;
  constructor(private router: Router) {
    this.routeURL = router.url
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userRole: any = sessionStorage.getItem("userRole")
    if(userRole === "AGENT"){
      return this.router.navigateByUrl("/homePage")
    }
    else {
      console.log(this.routeURL)
      return true;
    }
  }
}
