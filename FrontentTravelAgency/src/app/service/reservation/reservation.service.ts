import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Reservation} from "../../model/Reservation";
import {Destination} from "../../model/Destination";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  baseURL: string = "http://localhost:5000/reservation";
  ownerDataStream: any;

  constructor(private httpClient: HttpClient) {
    this.ownerDataStream = new BehaviorSubject<any>(null);
  }

  getReservationById(id: any): Observable<Reservation> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.httpClient.get<Reservation>(this.baseURL + "/getReservationByID/" + id, {headers: header})
  }

  getAllReservation(){
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.httpClient.get<Reservation[]>(this.baseURL + "/allReservations", {headers: header})
  }

  addReservation(id_user: any, id_destination: any, start_date: any, end_date: any): any {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
    let credentials = {id_user: id_user, id_destination: id_destination, start_date: start_date, end_date: end_date};
    return this.httpClient.post(this.baseURL + "/addReservation",
      JSON.stringify(credentials) ,{headers: header});
  }
}
