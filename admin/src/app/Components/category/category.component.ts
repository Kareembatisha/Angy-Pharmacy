import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../Services/category.service';
import { ProductService } from '../../Services/product.service';
import { Icategory } from '../../models/icategory';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    NgFor,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  //All Categorys in JsonServer
  categoriesData: any[] = [];

  // categoryModel
  category: Icategory = {} as Icategory;

  URL: string = '';

  //All Medicines in JsonServer
  medicenesData: any[] = [];

  medicenesName: any[] = [];

  updateMode: boolean = false;
  images: any;

  // categoryModel

  mediceneCategoryName: any;

  addCategoryForm: FormGroup;

  currentPage: number = 1; // Initialize current page to 1
  itemsPerPage: number = 10; // Set items per page to 10

  // Method to calculate total number of pages
  getTotalPages(): number {
    return Math.ceil(this.categoriesData.length / this.itemsPerPage);
  }

  // Method to get the current page of medicines
  getCurrentPageMedicines(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.categoriesData.slice(startIndex, endIndex);
  }

  // Method to change current page
  changePage(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private formbuilder: FormBuilder
  ) {
    if (!this.updateMode) {
      this.addCategoryForm = this.formbuilder.group({
        name: new FormControl('', [Validators.required]),
        image: new FormControl('', [Validators.required]),
      });
    } else {
      this.addCategoryForm = this.formbuilder.group({
        name: new FormControl('', [Validators.required]),
        image: new FormControl('', [Validators.required]),
      });
    }
  }

  get name() {
    return this.addCategoryForm.get('name');
  }

  get image() {
    return this.addCategoryForm.get('image');
  }

  onSelectFile(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]; // Store the file object
      this.images = file;
    }
  }

  getAllCategorys() {
    this.categoryService.getAllCategorys().subscribe({
      next: (data: any) => {
        // console.log(data.allCategories)

        // all categories data is here
        this.categoriesData = data.allCategories;
        console.log(this.categoriesData);
      },
    });
  }
  // getAllMedicines() {
  //   this.productService.getAllMedicines().subscribe({
  //     next: (data: any) => {
  //       console.log(data.allMedicines);
  //       // all medicine data is here
  //       this.medicenesData = data.allMedicines;

  //     },
  //   });
  // }

  ngOnInit(): void {
    this.getAllCategorys();
    // this.getAllMedicines();
  }

  clearForm() {
    this.category = {} as any;
  }

  addCategory() {
    const formData = new FormData();

    formData.append('image', this.images); // Append the file to FormData
    formData.append('name', this.name?.value); // Append the value of the form control

    // this.category.name = this.name?.value;
    // this.category.image = this.image?.value;
    console.log(formData);

    this.categoryService.addCategory(formData).subscribe({
      next: (data: any) => {
        if (data) {
          this.category = data.newcategory;
          this.categoriesData.push(data.newcategory); // Assuming the response contains the new medicine object
          this.getAllCategorys();
          // this.addMediceneForm.reset();
          this.addCategoryForm.reset();

          console.log('data success');

          this.clearForm(); // Clear the form fields after successful addition
        } else {
          console.error('Unexpected response format:', data);
        }
      },
      error: (err) => {
        console.log(`Error! ${err}`);
      },
    });
  }

  updateButton(name: string) {
    const selectedcategory = this.categoriesData.find(
      (category) => category.name === name
    );

    if (selectedcategory) {
      this.updateMode = true;
      // Copy selected medicine to the form model
      this.category = { ...selectedcategory };

      // Set form fields with selected medicine values
      this.addCategoryForm.patchValue({
        // Populate all form fields with selected medicine details
        name: this.category.name,
        image: this.category.image,
      });
    }
  }

  updatecategory() {
    const id = this.category._id;

    const formData = new FormData();

    formData.append('image', this.images); // Append the file to FormData
    formData.append('name', this.name?.value); // Append the value of the form control

    if (id) {
      const updatedcategoryData = { ...this.addCategoryForm.value }; // Get updated form values

      this.categoryService.updateCategoryName(id, formData).subscribe({
        next: () => {
          this.updateMode = false;
          this.getAllCategorys();
          this.addCategoryForm.reset();
        },
        error: (error) => {
          console.error('Error updating category:', error);
          // Handle error
        },
      });
    }
  }

  deleteCategory(name: string) {
    if (confirm('are You sure for delete ?')) {
      this.categoryService.deleteCategory(name).subscribe({
        next: (data) => {
          this.getAllCategorys();
        },
      });
    } else {
      this.getAllCategorys();
    }
  }
}
