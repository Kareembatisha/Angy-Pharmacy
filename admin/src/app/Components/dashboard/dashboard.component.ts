import { Component, OnInit } from '@angular/core';
import { Medicine } from '../../models/medicine';
import { ProductService } from '../../Services/product.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../Services/category.service';
import { OrderService } from '../../Services/order.service';
import { ChatService } from '../../Services/chat.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  mediceneJsonData: Medicine[] = [];

  categoryJsonData: any[] = [];

  orderdata: any[] = [];

  messagedata:any[]=[];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private _OrderService: OrderService,
    private _ChatService: ChatService
  ) {}

  ngOnInit(): void {
    this.getAllMedicines();
    this.getAllCategory();
    this.getAllorders();
    this.getAllmessages();
    console.log(this.messagedata);
    
  }

  getAllMedicines() {
    this.productService.getAllMedicines().subscribe({
      next: (data: any) => {
        this.mediceneJsonData = data.allMedicines;
        // console.log(data);
      },
    });
  }

  getAllCategory() {
    this.categoryService.getAllCategorys().subscribe({
      next: (data: any) => {
        this.categoryJsonData = data.allCategories;
      },
    });
  }
  getAllorders() {
    this._OrderService.getAllOrders().subscribe({
      next: (data: any) => {
        this.orderdata = data.allOrders;
      },
    });
  }
  getAllmessages() {
    this._ChatService.getAllChat().subscribe({
      next: (data: any) => {
        this.messagedata = data.unansweredPrescriptions;
      },
    });
  }
}
