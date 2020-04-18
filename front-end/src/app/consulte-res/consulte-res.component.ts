import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ReservationService } from '../shared/reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulte-res',
  templateUrl: './consulte-res.component.html',
  styleUrls: ['./consulte-res.component.css']
})
export class ConsulteResComponent implements OnInit {
  list = {} as any ;
  listUne = {} as any;
  c = localStorage.getItem('matricule');
  constructor(public dialogRef: MatDialogRef<ConsulteResComponent>, private auth: ReservationService, private router: Router) { }

  ngOnInit(): void {
    this.auth.getByMat(localStorage.getItem('matricule')).subscribe((res) => {
      this.list = res;
      this.listUne = this.list[(this.list.length - 1)];
    });
  }

  deleteReservation() {
    this.auth.deletelistReservation(this.list[(this.list.length - 1)]._id).subscribe((res) => {
      console.log('sup');
      localStorage.setItem('matricule', '');
    });
  }

}
