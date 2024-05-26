import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Services/order.service';
import { Iorder } from '../../models/iorder';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnInit {
  orderData: any[] = [];
  order: any = {};
  // hold order items
  orderitems: string[] = [];
  orderitem: string = '';

  currentPage: number = 1; // Initialize current page to 1
  itemsPerPage: number = 10; // Set items per page to 10

  // Method to calculate total number of pages
  getTotalPages(): number {
    return Math.ceil(this.orderData.length / this.itemsPerPage);
  }

  // Method to get the current page of medicines
  getCurrentPageMedicines(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.orderData.slice(startIndex, endIndex);
  }

  // Method to change current page
  changePage(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  constructor(private _OrderService: OrderService) {}
  ngOnInit(): void {
    this.getAllorders();
  }

  getAllorders() {
    this._OrderService.getAllOrders().subscribe({
      next: (data: any) => {
        this.orderData = data.allOrders;

        this.orderData.forEach((ele) => {});
      },
    });
  }

  acceptorder(id: any) {
    this._OrderService.acceptOrder(id).subscribe({
      next: (data: any) => {
        alert('Order Accepted');
        this.getAllorders();
      },
    });
  }
  cancelOrder(id: any) {
    console.log(id);

    if (confirm('are You sure for deny ?')) {
      this._OrderService.cancelOrder(id).subscribe({
        next: (data) => {
          alert('order deny');
          this.getAllorders();
        },
      });
    } else {
      this.getAllorders();
    }
  }
}
