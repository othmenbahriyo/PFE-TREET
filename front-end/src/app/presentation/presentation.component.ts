import { Component, OnInit } from '@angular/core';
import { ParkService } from '../shared/park.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent implements OnInit {
  latitude = 36.8540568;
  longitude = 10.207159;
  marker = {}  as any ;
  constructor(private auth: ParkService, private router: Router) { }

  ngOnInit(): void {
    this.auth.getListPark()
    .subscribe(res => this.marker = res);
  }

}
