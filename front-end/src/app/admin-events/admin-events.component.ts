import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})
export class AdminEventsComponent implements OnInit {
  registerUserData =  {} as any;
  listAdmin = {} as any ;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.auth.getListuser().subscribe((res) => {
      this.listAdmin = res;
    });
  }

  registerUser() {
    this.auth.registerAdmin(this.registerUserData)
    .subscribe(
      res => {
        this.router.navigate(['/gpark']);
      },
      err => console.log(err)
    );

  }
  // tslint:disable-next-line:variable-name
  onDeletee(_id: string) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.auth.deletePark(_id).subscribe((res) => {
        this.ngOnInit();
      });
    }
  }

}
