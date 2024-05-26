import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icategory } from '../models/icategory';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  //Get All Categorys//

  getAllCategorys(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/getAllCategories`);
  }

  //Add New Category// /addCategory
  addCategory(formData: FormData): Observable<any> {
    return this.http.post(`http://localhost:3000/addCategory`, formData);
  }

  //Delete Category// //deleteCategory/:name
  deleteCategory(name: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/deleteCategory/${name}`);
  }

  //Update Category Name
  updateCategoryName(id: string, formData: FormData): Observable<any> {
    return this.http.patch(
      `http://localhost:3000/updateCategory/${id}`,
      formData
    );
  }
}
