import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { Iuser } from '../models/iuser';
import jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  Token = '';
  user: BehaviorSubject<boolean>;
  Header = {};
  decodedToken: any[] = [];
  // token='will received from database'
  constructor(private http: HttpClient) {
    this.Header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // "Authorization": "Bearer "+this.token
      }),
    };
    this.user = new BehaviorSubject<boolean>(this.isUserLogged || false);
  }
  // check the token is here or not
  //this for register
  register(user: any): Observable<any> {
    return this.http.post(`http://localhost:3000/doctor/signup`, user);
  }

  get isUserLogged() {
    return localStorage.getItem('Token') ? true : false;
  }
  //this for login
  login(user: any): Observable<any> {
    return this.http.post(`http://localhost:3000/doctor/signin`, user).pipe(
      tap((response: any) => {
        console.log(response);
          this.Token = response.token; // Change this according to your backend response
          console.log(this.Token);
          localStorage.setItem('Token', this.Token);
          // this.user.next(true);
        
        // Assuming the token is returned in the response from the server

        // You can now access the decoded token properties
      })
    );
  }
  getUserState(): Observable<boolean> {
    return this.user.asObservable();
  }
  //this for logout
  logout() {
    localStorage.removeItem('Token');
    this.user.next(false);
  }
  //Get All Doctors
  getAllDoctors(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/getAllDoctors`);
  }

  //Get All Users
  getAllUsers(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/getAllCustomers`);
  }

  //Get User By Id
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/users/${id}`);
  }

  //Create User
  createUser(user: any): Observable<any> {
    return this.http.post<any>(
      `http://localhost:3000/users`,
      user,
      this.Header
    );
  }

  //Update User
  updateUser(user: any): Observable<any> {
    return this.http.put<any>(
      `http://localhost:3000/users/${user.id}`,
      user,
      this.Header
    );
  }

  ///deleteDoctor/:name
  deleteusers(email: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/deleteCustomer/${email}`);
  }
}
