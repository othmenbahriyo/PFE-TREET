import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { FormControl, NgForm } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  startDate: string;
  mytime: Date = new Date();
  time: Date = new Date();



  ngOnInit(): void {
    console.log(this.mytime.getTime() - this.time.getTime() );
  }



}
