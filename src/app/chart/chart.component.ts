import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  public lineChartData: any[] = [{}];
  public lineChartLabels: any[] = [];
  public lineChartOptions: any = {
    responsive: true,
    elements: { 
      point: { 
        radius: 0,
        hitRadius: 10, 
        hoverRadius: 5,
      } 
    } 
  };
  public lineChartColors: any[] = [
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';
  public showMyChart:boolean = false;
  public maxValue:any = ""
  temps:any = [];
  labels:any = [];
  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) {}
 
  ngOnInit() {
    this.getByDays(7);
  }
  getByDays(days) {
    this.temps = [];
    this.rest.getByDays(days).subscribe((data: {}) => {
      this.temps = data;
      this.temps = this.temps.filter((o, i) => !i || o.temp < 150  && (this.temps[i-1].temp - o.temp < 10))
      this.lineChartLabels = this.temps.map(o => (moment(o.date).format("YYYY-MM-DD HH:mm")));
      this.lineChartData = [{data: this.temps.map(o => (~~o.temp)), label: "Test"}];
      this.maxValue = Math.max(...this.lineChartData[0].data);
      this.showMyChart = true;
      console.log(this.maxValue);
    });
  }



  public randomize(): void {
    const lineChartData: any[] = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = lineChartData;
  }

}
