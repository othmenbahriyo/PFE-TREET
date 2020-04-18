import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = 'http://localhost:3000/api/register';
  private loginUrl = 'http://localhost:3000/api/login';
  private registerUrla = 'http://localhost:3000/api/registera';
  private loginUrla = 'http://localhost:3000/api/logina';
  private getlistAdminUrl = 'http://localhost:3000/api/list/admin';
  private deletepadminUrl = 'http://localhost:3000/api/list/admin';
  private getByName = 'http://localhost:3000/api';




  constructor(private http: HttpClient, private router: Router) { }




  loginUser(user) {
    return this.http.post<any>(this.loginUrl, user);
  }
  loginAdmin(user) {
    return this.http.post<any>(this.loginUrla, user);
  }

  registerUser(user) {
    return this.http.post<any>(this.registerUrl, user);
  }
  registerAdmin(user) {
    return this.http.post<any>(this.registerUrla, user);
  }
  getListuser() {
    return this.http.get<any>(this.getlistAdminUrl);
  }

  getToken() {
    return localStorage.getItem('token');
  }
  setLoggedina() {
    localStorage.setItem('isAdmin', 'true');

  }
   loggedIn() {
    return localStorage.getItem('token');
  }
  // tslint:disable-next-line:variable-name
  deletePark(_id: string) {
    return this.http.delete(this.deletepadminUrl + `/${_id}`);
  }
  getBynames(email: string) {
    return this.http.delete(this.getByName + `/${email}`);
  }

}
