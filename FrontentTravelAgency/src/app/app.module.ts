import {AppComponent} from "./app.component";
import {NgModule} from "@angular/core";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app.routes";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {MatToolbarModule} from "@angular/material/toolbar";
import {DestinationsPageComponent} from "./pages/destionations-page/destionations-page.component";
import {ContactPageComponent} from "./pages/contact-page/contact-page.component";
import {LogInPageComponent} from "./pages/log-in-page/log-in-page.component";
import {RegisterPageComponent} from "./pages/register-page/register-page.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {AgentPageComponent} from "./pages/agent-page/agent-page.component";


NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DestinationsPageComponent,
    ContactPageComponent,
    LogInPageComponent,
    RegisterPageComponent,
    AgentPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule
    // MatMomentDateModule
  ],
  providers: [
    // {provide: DateAdapter, useClass: MatNativeDateModule}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
