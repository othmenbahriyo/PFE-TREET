import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ChartDataSets, ChartOptions, ChartType , RadialChartOptions } from 'chart.js';
import { Color ,  SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { KafkaService } from '../shared/kafka.service';
import * as Chart from 'chart.js';
import { ParkService } from '../shared/park.service';
import { Router } from '@angular/router';
import { ReservationService } from '../shared/reservation.service';


@Component({
  selector: 'app-mat-board',
  templateUrl: './mat-board.component.html',
  styleUrls: ['./mat-board.component.css']
})
export class MatBoardComponent implements OnInit {
  marker = {} as any ;
  list = {} as any;
  times =  new Date();
  lun = 0 ;
  mar = 0 ;
  mer = 0 ;
  jeu = 0 ;
  ven = 0 ;
  sam = 0 ;
  dem = 0  ;
  d = 0;
  year = {jun: 0 , fev: 0 , mar: 0 , avr: 0 , mai: 0 , jon: 0 , jui: 0 , out: 0 , sep: 0 , oct: 0 , nouv: 0 , dec: 0};

  constructor(private auth: ParkService, private router: Router, private auths: ReservationService) { }

  ngOnInit(): void {

    this.auth.getListPark().subscribe((res) => {
      this.marker = res;
    });
    this.auths.getListReservation().subscribe(res => {
      this.list = res ;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0 ; i < this.list.length ; i++) {
        this.list[i].timeS = new Date(Number(Date.parse(this.list[i].timeS)));
        this.list[i].timeE = new Date(Number(Date.parse(this.list[i].timeE)));
        console.log('ddd' , this.list[i].timeE.getMonth());
        switch (this.list[i].timeE.getDay()  ) {
          case 1 : {
            this.lun ++;
            break;
          }
          case 2 : {
            this.mar ++;
            break;
          }
          case 3 : {
            this.mer ++;
            break;
          }
          case 4   : {
            this.jeu ++;
            break;
          }
          case 5 : {
            this.ven ++;
            break;
          }
          case 6 : {
            this.sam ++;
            break;
          }
          case 0 : {
            this.dem ++;
            break;
          }
        }
        switch (this.list[i].timeE.getMonth() ) {
          case 0 : {
            this.year.jun ++;
            break;
          }
          case 1 : {
            this.year.fev ++;
            break;
          }
          case 2 : {
            this.year.mar ++;
            break;
          }
          case 3   : {
            this.year.avr ++;
            this.lun ++;
            break;
          }
          case 4 : {
            this.year.mai ++;
            break;
          }
          case 5 : {
            this.year.jon ++;
            break;
          }
          case 6 : {
            this.year.jui ++;
            break;
          }
          case 7 : {
            this.year.out ++;
            break;
          }
          case 8 : {
            this.year.sep ++;
            break;
          }
          case 9: {
            this.year.oct ++;
            break;
          }
          case 10 : {
            this.year.nouv ++;
            break;
          }
          case 11 : {
            this.year.dec ++;
            break;
          }

        }
    }

    });

  }

  getNbCarsDay() {
     // tslint:disable-next-line:prefer-for-of
     for (let i = 0 ; i < this.list.length ; i++) {
      this.list[i].timeS = new Date(Number(Date.parse(this.list[i].timeS)));
      this.list[i].timeE = new Date(Number(Date.parse(this.list[i].timeE)));
      this.d += this.list[i].price;
      return this.d;

  }
}


}
