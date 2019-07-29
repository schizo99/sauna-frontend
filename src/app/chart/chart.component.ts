import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, of, fromEvent } from 'rxjs';
import { takeWhile, mergeMap, repeatWhen, delay } from 'rxjs/operators';
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
    scales: {
      xAxes: [{
          type: 'time',
          distribution: 'series',
          ticks: {
            source: 'labels',
            autoSkip: true,
            autoSkipPadding: 30,
          },
          time: {
              unit: 'hour',
              displayFormats: {
                hour: 'MMM D HH:mm'
            }
          },
      }],
      
    },
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
  private alive: boolean;
  temps:any = [];
  labels:any = [];
  public days:any = 7;
  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { this.alive = true; }

  ngOnInit() {
    this.getByDays()
    this.poll.subscribe(data => this.updateChart(data));
    fromEvent(window, 'focus').subscribe(test => this.alive = true)
    fromEvent(window, 'blur').subscribe(test => this.alive = false)
  }
  ngOnDestroy(){
    this.alive = false; // switches your IntervalObservable off
  }
  poll = of({}).pipe(
    delay(5000),
    takeWhile(() => this.alive),
    mergeMap(_ => this.rest.getByDays(this.days)),
    repeatWhen(complete => complete)
  );

  getByDays(){
    this.rest.getByDays(this.days).subscribe(data => this.updateChart(data))
  }
  updateChart(data){
    this.temps = [];
    let tempChartLabels = [];
    this.temps = data;
    this.temps = this.temps.filter((o, i) => !i || o.temp < 150  && (this.temps[i-1].temp - o.temp < 10))
    this.temps = this.temps.filter((o, i) => !i || (moment(this.temps[i-1].date).format("YYYY-MM-DD HH:mm") != moment(o.date).format("YYYY-MM-DD HH:mm")));
    tempChartLabels = this.temps.map(o => (moment(o.date).format("YYYY-MM-DD HH:mm")));
    this.lineChartData = [{data: this.temps.map(o => (~~o.temp)), label: "Test"}];
    this.lineChartLabels.length = 0;
    this.lineChartLabels.push(...tempChartLabels);
    this.maxValue = Math.max(...this.lineChartData[0].data);
    this.showMyChart = true;
  }
}
