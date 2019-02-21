import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

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
    this.getOneTemp();
    interval(10000).pipe( takeWhile(() => this.alive))
      .subscribe(() => {
        this.getOneTemp();
      });
  }

  getOneTemp() {
    this.temp = [];
    this.rest.getOneTemp().subscribe((data: {}) => {
      console.log(data);
      this.temp = data;
    });
  }

  /* add() {
    this.router.navigate(['/product-add']);
  }

  delete(id) {
    this.rest.deleteProduct(id)
      .subscribe(res => {
          this.getProducts();
        }, (err) => {
          console.log(err);
        }
      );
  } */
  ngOnDestroy(){
    this.alive = false; // switches your IntervalObservable off
  }
}