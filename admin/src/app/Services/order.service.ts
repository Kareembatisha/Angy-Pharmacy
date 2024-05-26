import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

Header={}

  constructor(private http:HttpClient) {
    this.Header={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })}
  }

//Get All Orders
  getAllOrders():Observable<any>{
    return this.http.get<any>('http://localhost:3000/getAllOrders');
  }

//Get Order By Id
 

//Cancel Order
  cancelOrder(id:number):Observable<any>{
    return this.http.patch<any>(
      `http://localhost:3000/denyOrder/${id}`,
      this.Header
    );
  }

//Accept Order
  acceptOrder(id:number):Observable<any>{
    return this.http.patch<any>(
      `http://localhost:3000/acceptOrder/${id}`,
      this.Header
    );
  }

//Reject Order
  rejectOrder(id:number):Observable<any>{
    return this.http.put<any>(`http://localhost:3000/orders/${id}`,this.Header);
  }

}
