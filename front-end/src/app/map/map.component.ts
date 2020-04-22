import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { ReservationService } from '../shared/reservation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {  NotificationsService } from 'angular2-notifications';
import { AuthService } from '../shared/auth.service';
import { ParkService } from '../shared/park.service';
import { parse } from 'date-fns';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  form: any;
  reserv = {} as any;
  list = {} as any ;
  listParking = [] as any ;
  lista = {} as any ;
  a: string;
  user = localStorage.getItem('name');
  image1 = 'assets/images/cap1.JPG';
  image2 = 'assets/images/Capture.JPG';


  constructor(private auth: ReservationService, private router: Router,
              public dialog: MatDialog, private route: ActivatedRoute,
              private service: NotificationsService, private auths: AuthService,
              private parkService: ParkService) {


      this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      Tpark: new FormControl('', Validators.required),
      matricule: new FormControl('', Validators.required),
      dateE: new FormControl('', Validators.required),
      timeE: new FormControl('', Validators.required),
      dateS: new FormControl('', Validators.required),
      timeS: new FormControl('', Validators.required)
    });
   }



  ngOnInit(): void {
    this.reserv.timeE = new Date();
    this.reserv.timeS = new Date();
    this.auth.getListReservation()
    .subscribe(res => this.list = res);
    this.parkService.getListPark().subscribe((res) => {
      this.listParking = res;
      console.log(this.listParking);
    });

    this.auth.getByMat(localStorage.getItem('matricule')).subscribe((res) => {
      this.lista = res;
      console.log('hyyy', this.lista[0]._id);
      this.a = this.lista[0]._id ;
    });
  }




/*
  getUrl() {
  // tslint:disable-next-line:max-line-length
  return 'url(\'https://www.primeparkingbook.com/wp-content/uploads/2019/12/ac1975e4-f8ee-4b5c-b76d-321325562de3.jpg\')';
}






 openDialog(): void {
    const dialogRef = this.dialog.open(MyDialogComponent, {
  });

    dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}



goToLink(url: string) {
  window.open(url, '_blank');
}*/



/*_____________________________________________ bch ysagel w les condition _______________________________ */

saveCall() {
  const data: any = this.form.value;
  if ( this.nbRepition() >= this.nbPlace()) {
    this.service.info('NO PLACE ', this.premierPlaceVide() , {
      position: ['bottom', 'right'],
      timeOut: 5000,
      animation: 'fade',
      showProgressBar: true
    });
  } else {
  if (!this.reserv.name || !this.reserv.Tpark || !this.reserv.dateE ||
    !this.reserv.timeE || !this.reserv.dateS || !this.reserv.timeS || this.timeRespect()   ) {
    this.service.error('ERROR', 'verifier vos champs et votre login' , {
      position: ['bottom', 'right'],
      timeOut: 5000,
      animation: 'fade',
      showProgressBar: true
    });

  } else {
    this.router.navigate(['/gestion'], {
      queryParams: {data: JSON.stringify(data)}
    });
  }
  }

}


/*----------------------------------------------------------9adech min karehba fil park---------------------------*/


nbRepition() {
  let nb = 0;
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0 ; i < this.list.length ; i++) {
    this.list[i].timeS = new Date(Number(Date.parse(this.list[i].timeS)));
    this.list[i].timeE = new Date(Number(Date.parse(this.list[i].timeE)));
    if (this.list[i].name === this.reserv.name && this.list[i].dateS === this.reserv.dateE &&
      (this.list[i].timeS.getTime() > this.reserv.timeE.getTime() && this.list[i].timeE.getTime() < this.reserv.timeE.getTime()) ) {
        nb ++;
        console.log('gggg');
    }


  }
  console.log('ti nb', nb);
  return nb;
}



/*------------------------------------9adech min blassa fil parking illi ikhtarou-----------------------------------*/
nbPlace() {
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0 ; i < this.listParking.length ; i++) {
    if (this.listParking[i].name === this.reserv.name) {
      console.log(this.listParking[i].nbplace);
      return this.listParking[i].nbplace;
    }
  }

}



/*****************************************____________ ki tabda m3abya wa9tch awel blassa tafra8___________************************** */
premierPlaceVide() {
  // tslint:disable-next-line:prefer-for-of
  const d = [];
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0 ; i < this.list.length ; i++) {
    this.list[i].timeS = new Date(Number(Date.parse(this.list[i].timeS)));
    this.list[i].timeE = new Date(Number(Date.parse(this.list[i].timeE)));
    if (this.list[i].dateS === this.reserv.dateE) {
      if (this.list[i].timeS.getTime() > this.reserv.timeE.getTime()  ) {
        d.push(this.list[i]);
      }
    }
  }
  console.log('heeh', d);
  let max = d[0];
  for (let i = 1; i < d.length; ++i) {
    d[i].timeS = new Date(Number(Date.parse(this.list[i].timeS)));
    if (d[i].timeS.getTime() < max.timeS.getTime()) {
      max = d[i];
  }
    console.log(max);
    return max.timeS ;
}

}

timeRespect() {
  if (this.reserv.timeE.getTime() > this.reserv.timeS.getTime()) {
    return true;
  } else {
    return false;
  }
}




}


