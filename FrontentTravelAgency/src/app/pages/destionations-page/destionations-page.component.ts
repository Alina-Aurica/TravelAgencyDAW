import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAnchor} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatInput, MatInputModule, MatSuffix} from "@angular/material/input";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatToolbar} from "@angular/material/toolbar";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Destination} from "../../model/Destination";
import {DecimalPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker
} from "@angular/material/datepicker";
import {MatNativeDateModule, MatRippleModule, provideNativeDateAdapter} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {DestinationService} from "../../service/destination/destination.service";
import {UserService} from "../../service/user/user.service";
import {ReservationService} from "../../service/reservation/reservation.service";
import {endWith} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {
  CalendarWithReservationsPageComponent
} from "../calendar-with-reservations-page/calendar-with-reservations-page.component";
import {
  GraphicWithReservationsPageComponent
} from "../graphic-with-reservations-page/graphic-with-reservations-page.component";

@Component({
  selector: 'app-destionations-page',
  standalone: true,
  imports: [
    FormsModule,
    MatAnchor,
    MatIcon,
    MatInput,
    MatMenu,
    MatMenuItem,
    MatToolbar,
    ReactiveFormsModule,
    RouterLink,
    MatMenuTrigger,
    NgForOf,
    NgOptimizedImage,
    MatFormField,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatDateRangePicker,
    MatDateRangeInput,
    MatSuffix,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DecimalPipe,
    NgIf,
    // MatMomentDateModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './destionations-page.component.html',
  styleUrl: './destionations-page.component.css'
})
export class DestinationsPageComponent implements OnInit {
  destinations: Destination[] = [];
  destinationsOffer: Destination[] = [];
  destinationLocation: any;
  agentVisible: boolean = false;
  clientVisible: boolean = false;
  logOutVisible: boolean = false;
  @ViewChild('offerSection') offerSection: ElementRef | undefined;
  @ViewChild('destinationSection') destinationSection: ElementRef | undefined;
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  userId: any;
  years: number[] = this.generateYearRange(new Date().getFullYear() - 5, new Date().getFullYear() + 5);
  selectedYear: number = new Date().getFullYear();
  yearAux: number = new Date().getFullYear();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private destinationService: DestinationService,
    private userService: UserService,
    private reservationService: ReservationService
  ) {

  }

  ngOnInit(): void {
    console.log("Suntem in Destinations!")
    this.destinationService.getAllDestinations().subscribe(
      (destinationsResult: Destination[]) => {
        destinationsResult.forEach(function(destination: Destination){
          destination.image = "assets/destination-1.jpg";
        })
        this.destinations = destinationsResult;
        // console.log(this.destinations)
      }
    )

    this.destinationService.getAllDestinationsByOffer().subscribe(
      (destinationsResult: Destination[]) => {
        destinationsResult.forEach(function (destination: Destination) {
          destination.image = "assets/destination-1.jpg";
          if(destination.price !== undefined && destination.offer !== undefined && destination.price != 0) {
            const discount = (destination.price * destination.offer / 100)
            destination.price -= discount
          }
        })
        this.destinationsOffer = destinationsResult;
      }
    )


    this.activatedRoute.queryParams.subscribe(params => {
      this.destinationLocation = params['searchLocation']
      //console.log(this.destinationLocation)
      this.searchLocation();
    });

    var userRole: any;
    userRole = sessionStorage.getItem("userRole");
    console.log(userRole);
    if(userRole !== null){
      this.logOutVisible = true;
      if(userRole === "AGENT")
        this.agentVisible = true;
      if(userRole === "CLIENT")
        this.clientVisible = true;
    }

    this.range.valueChanges.subscribe(val => {
      if (val.start && val.end) {
        this.seeAvailableDestinations();
      }
    });
  }

  searchLocation() {
    if(this.destinationLocation !== undefined){
      this.destinationService.getAllDestinationsByLocation(this.destinationLocation).subscribe(
        (destinationsResult: any) => {
          destinationsResult.forEach(function(destination: Destination){
            destination.image = "assets/destination-1.jpg";
          })
          this.destinations = destinationsResult;
        }
      )
    }
    else {
      this.destinationService.getAllDestinations().subscribe(
        (destinationsResult: Destination[]) => {
          destinationsResult.forEach(function(destination: Destination){
            destination.image = "assets/destination-1.jpg";
          })
          this.destinations = destinationsResult;
        }
      )
    }
  }

  removeFilter(){
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { searchLocation: null },
      queryParamsHandling: 'merge',
    });
  }

  // rezervare destinatie
  addReservation(destinationID: any){
    console.log(destinationID);
    var userEmail: any;
    userEmail = sessionStorage.getItem("userEmail");
    let rangeValues = this.range.value;
    let { start, end } = rangeValues;

    this.userService.getUserByEmail(userEmail).subscribe(
      (userResult: any) => {
        this.userId = userResult.id;
        this.reservationService.addReservation(this.userId, destinationID, this.formatDate(start), this.formatDate(end)).subscribe(
              (reservationResult: any) => {
                alert("Reservation successfully created!");
              },
              (error: Error) => {
                console.error(error);
                alert("Reservation failed!");
              }
            );
      },
      (error: Error) => {
        console.log("Nu avem email!")
      }
    );
  }

  statisticsReservation(destinationID: any) {
    console.log(this.yearAux)
    this.reservationService.getAllReservationsByDestinationIDYearCountPerMonths(destinationID, this.yearAux).subscribe(
        (result: Array<any>) => {
          console.log(result)
          this.dialog.open(GraphicWithReservationsPageComponent, {
            width: '700px',
            height: 'auto',
            data: {result}
          })
        },
        (error: Error) => {
          console.error(error)
        }
    )
  }

  generateYearRange(start: number, end: number): number[] {
    const years = [];
    for (let year = start; year <= end; year++) {
      years.push(year);
    }
    return years;
  }

  onYearChange(): void {
    console.log(`Suntem aici`);
    this.yearAux = this.selectedYear;
  }

  seeReservations(destinationID: any) {
    this.reservationService.getAllReservationsByDestinationID(destinationID).subscribe(
      (reservationsResult: any) => {
        this.dialog.open(CalendarWithReservationsPageComponent, {
          width: '700px',
          height: 'auto',
          data: {reservationsResult}
        })
      },
      (error: Error) => {
        console.error(error)
      }
    )
  }

  seeAvailableDestinations(){
    let rangeValues = this.range.value;
    let { start, end } = rangeValues;

    this.destinationService.getAllDestinationsAvailable(this.formatDate(start), this.formatDate(end)).subscribe(
      (destinationsResult: any) => {
        destinationsResult.forEach(function(destination: Destination){
          destination.image = "assets/destination-1.jpg";
        })
        this.destinations = destinationsResult;
        console.log("Filter success!");
      },
      (error: Error) => {
        console.error(error);
      }
    )
  }

  formatDate(date: any): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedMonth = month < 10 ? `0${month}` : month.toString();
    const formattedDay = day < 10 ? `0${day}` : day.toString();

    return `${year}-${formattedMonth}-${formattedDay}`;
  }

  scrollToOffers(){
    if(this.offerSection !== undefined)
      this.offerSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToDestinations(){
    if(this.destinationSection !== undefined)
      this.destinationSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  logOut(): void {
    //localStorage.clear();
    sessionStorage.clear();
    this.logOutVisible = false;
    this.agentVisible = false;
    this.clientVisible = false;
    this.router.navigateByUrl("/destinationsPage");
  }

}
