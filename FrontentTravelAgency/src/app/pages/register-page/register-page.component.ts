import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatAnchor} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatToolbar} from "@angular/material/toolbar";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {User} from "../../model/User";
import {AuthService} from "../../service/auth/auth.service";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    MatAnchor,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatToolbar,
    NgIf,
    RouterLink,
    MatMenuTrigger
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnInit{
  user: User = new User();

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  register() {
    console.log(this.user)
    this.authService.register(this.user.name, this.user.email, this.user.password).subscribe(
      (userRegistered: User) => {
        this.user = userRegistered
        alert("Registration successfully")
      },
      (error: any) => {
        console.error(error)
        const errorMessage = error.error.message
        console.log(errorMessage)
        if(errorMessage === "User already registered")
          alert("User already registered")
        else
          alert("Registration failed - some fields are null or incorrect completed!")
      }
    )
  }



}
