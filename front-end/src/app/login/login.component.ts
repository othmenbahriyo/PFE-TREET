import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData = {} as any;
  list = {} as any;


  constructor(private auth: AuthService, private router: Router) { }


  ngOnInit(): void {
  }



  loginUser() {
    if (this.loginUserData.email === 'admin' && this.loginUserData.password === 'admin' ) {
      localStorage.setItem('role', 'admin');
      this.router.navigate(['/admin']);
    }
    this.auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        console.log(this.loginUserData.session);
        localStorage.setItem('token', res.token);
        localStorage.setItem('name', this.loginUserData.email);
        this.router.navigate(['/map']);
        localStorage.setItem('role', 'user');
      },
      err => console.log(err)
    );
    this.auth.loginAdmin(this.loginUserData)
    .subscribe(
      res => {
        console.log(this.loginUserData.session);
        localStorage.setItem('token', res.token);
        localStorage.setItem('name', 'admin');
        localStorage.setItem('role', 'admin');
        this.router.navigate(['/map']);
        window.open('http://localhost:4200/ch');
      },
      err => console.log(err)
    );

  }

}
