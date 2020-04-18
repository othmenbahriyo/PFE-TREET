import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../shared/reservation.service';
import { Router } from '@angular/router';
import { PriceService } from '../shared/price.service';
import { ParkService } from '../shared/park.service';

@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.css']
})
export class TableauComponent implements OnInit {
  list = [] as any ;
  matricule: string;
  myPrice = [] as any;
  prices =  {} as any;
  valid = [false, false, false] as any  ;


  constructor(private auth: ReservationService, private priceService: PriceService, private router: Router) { }


  ngOnInit(): void {
    this.auth.getListReservation().subscribe((res) => {
      this.list = res;
    });

  }



// tslint:disable-next-line:align
// tslint:disable-next-line:variable-name
onDelete(_id: string) {
  if (confirm('Are you sure to delete this record ?') === true) {
    this.auth.deletelistReservation(_id).subscribe((res) => {
      this.ngOnInit();
    });
  }
}


onValidReservation(i) {
  const x = document.getElementById('mytable').getElementsByTagName('tr');
  x[i + 1].style.backgroundColor = 'yellow';
  this.prices.valeur = this.list[i].Tpark;
  this.prices.date = this.list[i].dateE;
  this.myPrice.push(this.prices);
  console.log(this.myPrice[i]);
  this.valid[i + 1] = true;
  this.priceService.savePrice(this.myPrice[i]).subscribe(
    res => {
      console.log(res);
    },
    err => console.log(err)
  );
}
somefunction(i: number, id: string) {
  const x = document.getElementById('mytable').getElementsByTagName('tr');
  x[i + 1].style.backgroundColor = '#FFFFFF';
  this.valid[i + 1] = false;
  if (confirm('Are you sure to delete this record ?') === true) {
    this.priceService.deletePrice(id).subscribe((res) => {
    });
  }
}

}

