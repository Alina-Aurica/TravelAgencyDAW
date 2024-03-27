import {Component, Inject, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAnchor} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatToolbar} from "@angular/material/toolbar";
import {Router, RouterLink} from "@angular/router";
import {Contact} from "../../model/Contact";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-contact-page',
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
    NgIf
  ],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css'
})
export class ContactPageComponent implements OnInit{
  contact: Contact = new Contact();
  agentVisible: boolean = false;
  logOutVisible: boolean = false;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
    console.log("Suntem in Contact!");
    var userRole: any;
    userRole = sessionStorage.getItem("userRole");
    console.log(userRole);
    if(userRole !== null){
      this.logOutVisible = true;
      if(userRole === "AGENT")
        this.agentVisible = true;
    }
  }

  onSubmit(){

  }

  logOut(): void {
    //localStorage.clear();
    sessionStorage.clear();
    this.logOutVisible = false;
    this.agentVisible = false;
    this.router.navigateByUrl("/contactPage");
  }

}
