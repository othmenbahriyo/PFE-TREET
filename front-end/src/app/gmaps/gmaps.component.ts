import { Component, OnInit } from '@angular/core';
import { ParkService } from '../shared/park.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gmaps',
  templateUrl: './gmaps.component.html',
  styleUrls: ['./gmaps.component.css']
})
export class GmapsComponent implements OnInit {
  marker = {} as any;
  markers = {} as any;
  selected: string;
  t: any;
  capteur: string;
  constructor(private auth: ParkService, private router: Router) { }

  ngOnInit(): void {
    this.refreshEmployeeList();
  }


  refreshEmployeeList() {
    this.auth.getListPark().subscribe((res) => {
      this.marker = res;
      this.marker.capteur = this.t.split(',');
    });
  }

  filterChanged(selectedValue: string) {
    this.selected = selectedValue;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.marker.length; i++) {
      if (selectedValue === this.marker[i].name) {
        // tslint:disable-next-line:prefer-for-of
        for (let j = 1; j < this.marker[i].capteur.length; j++) {
          this.t = this.marker[i].capteur;
          console.log(this.marker[i]);
        }
      }
    }
    return this.t;
  }


  addCapteur() {
    // tslint:disable-next-line:no-unused-expression

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.marker.length; i++) {
      if (this.selected === this.marker[i].name) {
        this.t.push(this.capteur);
        this.marker[i].capteur = this.t;
        this.auth.updatepark(this.marker[i]).subscribe((res) => {
    });
        this.capteur = '';
  }}
  }

  deleteCapteur(j) {
    // tslint:disable-next-line:no-unused-expression

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.marker.length; i++) {
      if (this.selected === this.marker[i].name) {
        this.t.splice(j, 1);
        this.marker[i].capteur = this.t;
        this.auth.updatepark(this.marker[i]).subscribe((res) => {
    });
        this.capteur = '';
  }}
}


}


