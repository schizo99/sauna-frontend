import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, fromEvent } from 'rxjs';
import { takeWhile, mergeMap, delay, repeatWhen, skipWhile } from 'rxjs/operators';

@Component({
  selector: 'app-temp',
  templateUrl: './temp.component.html',
  styleUrls: ['./temp.component.css']
})

export class TempComponent implements OnInit {

  temp:any = [];
  private alive: boolean; 
  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { this.alive = true; }

  ngOnInit() {
    this.rest.getOneTemp().subscribe(data => this.temp = data)
    this.poll.subscribe(data => this.temp = data)
    
    fromEvent(window, 'focus').subscribe(test => this.alive = true)
    fromEvent(window, 'blur').subscribe(test => this.alive = false)
  }
  
  poll = of({}).pipe(
    takeWhile(() => this.alive),
    mergeMap(_ => this.rest.getOneTemp()),
    delay(5000),
    repeatWhen(complete => complete)
  );

  ngOnDestroy(){
    this.alive = false; // switches your IntervalObservable off
  }
}