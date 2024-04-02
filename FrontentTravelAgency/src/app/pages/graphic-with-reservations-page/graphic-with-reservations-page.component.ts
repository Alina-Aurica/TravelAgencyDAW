import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {ChartOptions, ChartType, ChartDataset, registerables} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import {MatButton} from "@angular/material/button";
import { Chart, BarController, BarElement, CategoryScale, LinearScale } from 'chart.js';
Chart.register(BarController, BarElement, CategoryScale, LinearScale);

interface ReservationData {
  result: Array<{
    count: number;
    month: string;
  }>;
}

@Component({
  selector: 'app-graphic-with-reservations-page',
  standalone: true,
  imports: [
    MatDialogModule,
    BaseChartDirective,
    MatButton,
  ],
  templateUrl: './graphic-with-reservations-page.component.html',
  styleUrl: './graphic-with-reservations-page.component.css'
})
export class GraphicWithReservationsPageComponent implements OnInit{
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'bar';
  public barChartData: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ReservationData){
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    console.log("In chart page!")
    console.log(this.data)
    if (this.data && Array.isArray(this.data.result)) {
      this.barChartLabels = this.data.result.map((dataAux: { month: any; }) => `Month ${dataAux.month}`);
      this.barChartData = [{
        data: this.data.result.map((dataAux: { count: any; }) => dataAux.count),
        label: 'Number of reservations per months'
      }];
    } else {
      console.error('Data does not contain a result array', this.data);
    }
  }

}
