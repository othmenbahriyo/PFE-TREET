import { Component, OnInit, Inject, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ParkService } from '../shared/park.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';



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
  M: any;
  isDraggable: boolean;
  selected = '';
  cmp = 0;
  t: string;


  constructor(private auth: ParkService, private router: Router) { }

  ngOnInit(): void {
    this.auth.getListPark().subscribe((res) => {
      this.marker = res ,
      this.cmp = this.marker.length ;
    });

  }











}


