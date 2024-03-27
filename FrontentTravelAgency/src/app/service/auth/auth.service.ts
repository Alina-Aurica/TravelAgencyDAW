import {Injectable, NgModule} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL: string = "http://localhost:5000/auth";
  ownerDataStream: any;

  constructor(private httpClient:HttpClient) {
    this.ownerDataStream = new BehaviorSubject<any>(null);
  }

  public login(email: any, password: any): any {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
    let credentials = { email: email, password: password };
    return this.httpClient.post(this.baseURL + "/login",
      JSON.stringify(credentials), {headers: header});
  }

  public register(name: any, email: any, password: any): any
  {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
    let credentials = {name: name, email: email, password: password}
    return this.httpClient.post(this.baseURL + "/register",
      JSON.stringify(credentials), {headers: header, observe:'response'});
  }
}
