import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GuardsService implements CanActivate {
  routeURL: String;
  constructor(private router: Router) {
    this.routeURL = router.url
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userEmail: any = sessionStorage.getItem("userEmail")
    //console.log("SUNTEM AICI")
    if(userEmail != null) {
      console.log(this.routeURL)
      return true;
    }
    else {
      console.log(this.routeURL)
      return this.router.navigateByUrl("/homePage");
    }
  }
}
