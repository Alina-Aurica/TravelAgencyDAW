import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatAnchor} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatToolbar} from "@angular/material/toolbar";
import {Router, RouterLink} from "@angular/router";
import {User} from "../../model/User";
import {NgIf} from "@angular/common";
import {AuthService} from "../../service/auth/auth.service";

@Component({
  selector: 'app-log-in-page',
  standalone: true,
  imports: [
    FormsModule,
    MatAnchor,
    MatIcon,
    MatInput,
    MatMenu,
    MatMenuItem,
    MatToolbar,
    RouterLink,
    MatMenuTrigger,
    NgIf
  ],
  templateUrl: './log-in-page.component.html',
  styleUrl: './log-in-page.component.css'
})
export class LogInPageComponent implements OnInit{
  user: User = new User();

  constructor(
    private router: Router,
    private authService: AuthService
  ){

  }

  ngOnInit(): void {
  }

  logIn(){
    console.log(this.user);
    this.authService.login(this.user.email, this.user.password).subscribe(
      (userLogged: any) => {
        console.log(userLogged)
        sessionStorage.setItem("userEmail", userLogged.email);
        sessionStorage.setItem("userRole", userLogged.role);
        alert("Login successfully");

        if (userLogged.role === "AGENT") {
          console.log("AGENT");
          this.router.navigateByUrl("/agentPage");
        } else {
          if (userLogged.role === "CLIENT") {
            console.log("client");
            this.router.navigateByUrl("/destinationsPage");
          }
        }
      },
      (error: any) => {
        console.error(error)
        const errorMessage = error.error.message
        console.log(errorMessage)
        if(errorMessage === "Missing email")
          alert("Missing email")
        if(errorMessage === "Missing password")
          alert("Missing password")
        if(errorMessage === "Invalid email or password")
          alert("Email and/or password are incorrect. Please, rewrite them.");
      }
    );
  }
}
