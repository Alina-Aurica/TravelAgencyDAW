import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../../model/User";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL: string = "http://localhost:5000/user";
  ownerDataStream: any;

  constructor(private httpClient:HttpClient) {
    this.ownerDataStream = new BehaviorSubject<any>(null);
  }

  getUserById(id: any): Observable<User> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.httpClient.get<User>(this.baseURL + "/getUserByID/" + id, {headers: header})
  }

  getUserByEmail(email: any): Observable<User> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.httpClient.get<User>(this.baseURL + "/getUserByEmail/" + email, {headers: header})
  }

  addUser(name: any, email: any, password: any, role: any): any {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
    let credentials = {name: name, email: email, password: password, role: role};
    return this.httpClient.post(this.baseURL + "/addUser",
      JSON.stringify(credentials) ,{headers: header});
  }
}
