import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicine } from '../models/medicine';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  Header = {};

  constructor(private http: HttpClient) {
    this.Header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  //Get All Products//  /'http://localhost:3000/getAllMedicines'
  getAllMedicines(): Observable<any> {
    return this.http.get(`http://localhost:3000/getAllMedicines`);
  }

  // //Add New Product// /addMedicine
  // addMedicine(product: Medicine): Observable<any> {
  //   return this.http.post(
  //     `http://localhost:3000/addMedicine`,
  //     product,
  //     this.Header
  //   );
  // }

  addMedicine(formData: FormData): Observable<any> {
    return this.http.post(`http://localhost:3000/addMedicine`, formData);
  }

  //Update Product//  /updateMedicine/:name
  updateMedicine(id: string, formData: FormData): Observable<any> {
    return this.http.put(
      `http://localhost:3000/updateMedicine/${id}`,
      formData
    );
  }

  //Delete Product//  /deleteMedicine/:name"
  deleteMedicine(name: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/deleteMedicine/${name}`);
  }
}
