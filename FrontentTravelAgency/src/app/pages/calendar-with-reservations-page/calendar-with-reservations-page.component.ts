import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {CalendarA11y, CalendarEvent, CalendarModule, DateAdapter} from "angular-calendar";
import {endOfDay, startOfDay} from "date-fns";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButton} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-calendar-with-reservations-page',
  standalone: true,
    imports: [
        MatDialogContent,
        MatDialogActions,
        MatButton,
        MatDialogClose,
        MatDialogTitle,
        CalendarModule,
        CommonModule,
        FormsModule
    ],
  providers: [CalendarA11y],
  templateUrl: './calendar-with-reservations-page.component.html',
  styleUrl: './calendar-with-reservations-page.component.css'
})
export class CalendarWithReservationsPageComponent implements OnInit{
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  months = Array.from({length: 12}, (v, k) => new Date(0, k).toLocaleString('default', { month: 'long' }));
  years: number[] = Array.from({length: 20}, (v, k) => new Date().getFullYear() - 10 + k);
  selectedMonth: number = this.viewDate.getMonth();
  selectedYear: number = this.viewDate.getFullYear();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {
    this.events = this.data.reservationsResult.map((reservation: any) => {
      return {
        start: startOfDay(new Date(reservation.start_date)),
        end: endOfDay(new Date(reservation.end_date)),
        title: 'Reservation',
        // color: {
        //   primary: 'royalblue',
        //   // secondary: '#D1E8FF',
        // },
      };
    });
  }

  onMonthOrYearChange(): void {
      this.viewDate = new Date(this.selectedYear, this.selectedMonth, 1);
  }
}
