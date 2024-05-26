import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { Iuser } from '../../models/iuser';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  userdata: any[] = [];
  users: Iuser = {} as Iuser;

  currentPage: number = 1; // Initialize current page to 1
  itemsPerPage: number = 10; // Set items per page to 10

  // Method to calculate total number of pages
  getTotalPages(): number {
    return Math.ceil(this.userdata.length / this.itemsPerPage);
  }

  // Method to get the current page of medicines
  getCurrentPageMedicines(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.userdata.slice(startIndex, endIndex);
  }

  // Method to change current page
  changePage(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
  constructor(private _UserService: UserService) {}
  ngOnInit(): void {
    this.AllDoctors();
    // this.AllUsers();
  }
  AllDoctors() {
    this._UserService.getAllUsers().subscribe({
      next: (data) => {
        console.log(data);

        this.userdata = data.customers;
        console.log(data);
      },
    });
  }

  // AllUsers(){
  //   this._UserService.getAllUsers().subscribe({
  //     next: (data) => {
  //       // console.log(data);
  //     },
  //   });
  // }
  deleteeDoctor(email: string) {
     if (confirm('are You sure for delete ?')) {
       this._UserService.deleteusers(email).subscribe({
         next: (data) => {
           this.AllDoctors();
         },
       });
     } else {
       this.AllDoctors();
     }
  }
}
