import { Component, OnInit, Inject, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ParkService } from '../shared/park.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ReservationService } from '../shared/reservation.service';



@Component({
  selector: 'app-gpark',
  templateUrl: './gpark.component.html',
  styleUrls: ['./gpark.component.css']
})
export class GparkComponent implements OnInit {
  markers = {} as any;
  marker = {} as any ;
  list = {} as any;
  parking = {} as any;
  m = 0;
  isDraggable: boolean;
  selected: string;
  cmp = 0;
  nbv = 0;
  nbt = 0;
  nbc = 0;
  nbn = 0;
  nbp = 0;
  prix = 0;
  time: Date = new Date();


  constructor(private auth: ParkService, private router: Router, private auths: ReservationService) { }

  ngOnInit(): void {
    this.auth.getListPark().subscribe((res) => {
      this.marker = res ,
      this.cmp = this.marker.length ;
    });
    this.auths.getListReservation().subscribe(res => {
      this.list = res,
      console.log(this.list);
    });

  }



  filterChanged(selectedValue: string) {
    this.m = 0;
    this.selected = selectedValue;
    this.nbc = 0;
    this.nbn = 0;
    this.nbp = 0;
    this.nbv = 0;
    this.nbt = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.list.length; i++) {
        // tslint:disable-next-line:prefer-for-of
        this.list[i].timeS = new Date(Number(Date.parse(this.list[i].timeS)));
        this.list[i].timeE = new Date(Number(Date.parse(this.list[i].timeE)));
        console.log( this.list[i].timeE.getTime());
        if ( selectedValue === this.list[i].name &&  (this.list[i].timeS.getTime() > this.time.getTime() &&
             this.list[i].timeE.getTime() < this.time.getTime()) ) {
             this.m ++ ;
        }
        if (this.list[i].Tpark === 'covered_18$' && selectedValue === this.list[i].name &&
            this.list[i].timeS.getTime() > this.time.getTime() &&
            this.list[i].timeE.getTime() < this.time.getTime() ) {
          this.nbc++;
        }
        if (this.list[i].Tpark === 'normal_10$' && selectedValue === this.list[i].name &&
        this.list[i].timeS.getTime() > this.time.getTime() &&
        this.list[i].timeE.getTime() < this.time.getTime() ) {
        this.nbn++;
         }
        if (this.list[i].Tpark === 'Professional_25$' && selectedValue === this.list[i].name &&
            this.list[i].timeS.getTime() > this.time.getTime() &&
            this.list[i].timeE.getTime() < this.time.getTime() ) {
          this.nbp++;
        }



      }
    // tslint:disable-next-line:prefer-for-of
    for (let j = 0; j < this.marker.length; j++) {
        if (selectedValue === this.marker[j].name) {
          console.log(this.marker[j].nbplace);
          this.nbv = this.marker[j].nbplace - this.m;
          this.nbt = this.marker[j].nbplace;
        }


      }
    console.log('ti nb', this.m);
    return this.m;
  }







}


