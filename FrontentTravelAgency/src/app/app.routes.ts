import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {DestinationsPageComponent} from "./pages/destionations-page/destionations-page.component";
import {ContactPageComponent} from "./pages/contact-page/contact-page.component";
import {LogInPageComponent} from "./pages/log-in-page/log-in-page.component";
import {RegisterPageComponent} from "./pages/register-page/register-page.component";
import {AgentPageComponent} from "./pages/agent-page/agent-page.component";
import {GuardsService} from "./authorization/auth/guards.service";
import {GuardsAdminService} from "./authorization/authAdmin/guards-admin.service";
import {
  GraphicWithReservationsPageComponent
} from "./pages/graphic-with-reservations-page/graphic-with-reservations-page.component";

export const routes: Routes = [
  {path: "homePage", component:HomePageComponent},
  {path: "destinationsPage", component:DestinationsPageComponent},
  {path: "contactPage", component:ContactPageComponent},
  {path: "logInPage", component:LogInPageComponent},
  {path: "registerPage", component:RegisterPageComponent},
  {path: "agentPage", component:AgentPageComponent, canActivate: [GuardsService, GuardsAdminService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
