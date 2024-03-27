import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Destination} from "../../model/Destination";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  baseURL: string = "http://localhost:5000/destination";
  ownerDataStream: any;

  constructor(private httpClient: HttpClient) {
    this.ownerDataStream = new BehaviorSubject<any>(null);
  }

  getDestinationById(id: any): Observable<Destination> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.httpClient.get<Destination>(this.baseURL + "/getDestinationByID/" + id, {headers: header})
  }

  getDestinationByName(name: any): Observable<Destination> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.httpClient.get<Destination>(this.baseURL + "/getDestinationByName/" + name, {headers: header})
  }

  getAllDestinations(){
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.httpClient.get<Destination[]>(this.baseURL + "/allDestinations", {headers: header})
  }

  getAllDestinationsByLocation(location: any){
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.httpClient.get<Destination[]>(this.baseURL + "/allDestinationsByLocation/" + location, {headers: header})
  }

  getAllDestinationsByOffer(){
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.httpClient.get<Destination[]>(this.baseURL + "/allDestinationsByOffer", {headers: header})
  }

  getAllDestinationsAvailable(start_date: any, end_date: any){
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.httpClient.get<Destination[]>(this.baseURL + "/allDestinationsAvailable/" + start_date + "/" + end_date, {headers: header})
  }


  addDestination(name: any, description: any, location: any, numberOfRooms: any, numberOfSeatsAvailable: any, numberOfSeatsTotal: any, price: any, offer: any): any {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
    let credentials = {name: name, description: description, location: location, numberOfRooms: numberOfRooms, numberOfSeatsAvailable: numberOfSeatsAvailable, numberOfSeatsTotal: numberOfSeatsTotal, price: price, offer: offer};
    return this.httpClient.post(this.baseURL + "/addDestination",
      JSON.stringify(credentials) ,{headers: header});
  }

  updateDestination(id: any, name: any, description: any, location: any, numberOfRooms: any, numberOfSeatsAvailable: any, numberOfSeatsTotal: any, price: any, offer: any){
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
    let credentials = {name: name, description: description, location: location, numberOfRooms: numberOfRooms, numberOfSeatsAvailable: numberOfSeatsAvailable, numberOfSeatsTotal: numberOfSeatsTotal, price: price, offer: offer};
    return this.httpClient.put(this.baseURL + "/updateDestination/" + id,
      JSON.stringify(credentials) ,{headers: header});
  }

  deleteDestination(id: any){
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.httpClient.delete(this.baseURL + "/deleteDestination/" + id, {headers: header})
  }

}
