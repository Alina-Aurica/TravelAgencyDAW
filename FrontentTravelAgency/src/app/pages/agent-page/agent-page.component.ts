import {Component, Inject, OnInit} from '@angular/core';
import {MatAnchor} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatToolbar} from "@angular/material/toolbar";
import {Router, RouterLink} from "@angular/router";
import {Destination} from "../../model/Destination";
import {DestinationService} from "../../service/destination/destination.service";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-agent-page',
  standalone: true,
  imports: [
    MatAnchor,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatToolbar,
    RouterLink,
    MatMenuTrigger,
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './agent-page.component.html',
  styleUrl: './agent-page.component.css'
})
export class AgentPageComponent implements OnInit {
  destination: Destination = new Destination();
  destinations: Destination[] = [];

  constructor(
    private router: Router,
    private destinationService: DestinationService
  ) {
  }

  ngOnInit(): void {
    this.destinationService.getAllDestinations().subscribe(
      (destinationsResult =>{
        destinationsResult.forEach(function(destination: Destination){
          destination.editable = false
        })
        this.destinations = destinationsResult
      }),
      (_error: Error) => {
        console.error(_error)
      }
    )
  }

  addDestination(){
    this.destinationService.addDestination(
      this.destination.name,
      this.destination.description,
      this.destination.location,
      this.destination.numberOfRooms,
      this.destination.numberOfSeatsAvailable,
      this.destination.numberOfSeatsTotal,
      this.destination.price,
      this.destination.offer).subscribe(
      ((destinationResult: any) => {
        console.log(destinationResult);
        alert("Destination successfully added!");
      }),
      (_error: Error) => {
        console.error(_error)
        alert("Destination can't be added!")
      }
    );
    this.destinationService.getAllDestinations().subscribe(
      (destinationsResult: Destination[]) => {
        destinationsResult.forEach(function(destination: Destination){
          destination.editable = false
        })
        this.destinations = destinationsResult;

      }
    );
  }

  // dubios pe aici
  updateDestination(destinationAux: Destination){
    this.destinationService.updateDestination(
      destinationAux.id,
      destinationAux.name,
      destinationAux.description,
      destinationAux.location,
      destinationAux.numberOfRooms,
      destinationAux.numberOfSeatsAvailable,
      destinationAux.numberOfSeatsTotal,
      destinationAux.price,
      destinationAux.offer
      ).subscribe(
      (destinationResult: any) => {
        alert("Updated successfully!")
      }
    );
    this.destinationService.getAllDestinations().subscribe(
      (destinationsResult: Destination[]) => {
        destinationsResult.forEach(function(destination: Destination){
          destination.editable = false
        })
        this.destinations = destinationsResult
      }
    );
  }

  // same here
  deleteDestination(destinationId: any){
    this.destinationService.deleteDestination(destinationId).subscribe(
      (destinationResult: any) => {
        alert("Deleted successfully!")
        this.destinationService.getAllDestinations().subscribe(
          (destinationsResult: Destination[]) => {
            destinationsResult.forEach(function(destination: Destination){
              destination.editable = false
            })
            this.destinations = destinationsResult
          }
        )
      }
    );
  }

  setEditable(destinationAux: Destination){
    destinationAux.editable = true;
  }

  logOut(): void {
    //localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl("/homePage");
  }

}
