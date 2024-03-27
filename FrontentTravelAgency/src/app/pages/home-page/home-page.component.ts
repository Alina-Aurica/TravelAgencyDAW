import {Component, Inject, OnInit} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {Router, RouterLink} from "@angular/router";
import {MatAnchor, MatIconButton} from "@angular/material/button";
import {MatFormField, MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    MatMenu,
    MatFormField,
    MatMenuTrigger,
    MatMenuItem,
    RouterLink,
    MatAnchor,
    MatIconButton,
    MatInput,
    FormsModule,
    NgIf
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  destinationLocation: any
  agentVisible: boolean = false;
  logOutVisible: boolean = false;

  constructor(
    private router: Router,
    @Inject('Window') private window: Window
  ){

  }
  ngOnInit(): void {
    this.saveUserLocation();
    console.log("Suntem in Home!");
    var userRole: any;
    userRole = sessionStorage.getItem("userRole");
    console.log(userRole);
    if(userRole !== null){
      this.logOutVisible = true;
      if(userRole === "AGENT")
        this.agentVisible = true;
    }
  }

  searchLocation(){
    this.router.navigate(['/destinationsPage'], {queryParams: {searchLocation: this.destinationLocation}})
  }

  saveUserLocation() {
    if('geolocation' in this.window.navigator) {
      this.window.navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = {latitude, longitude};
          this.window.localStorage.setItem('userLocation', JSON.stringify(location))
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("I can't save the location!");
    }
  }

  logOut(): void {
    //localStorage.clear();
    sessionStorage.clear();
    this.logOutVisible = false;
    this.agentVisible = false;
    this.router.navigateByUrl("/homePage");
  }


}
