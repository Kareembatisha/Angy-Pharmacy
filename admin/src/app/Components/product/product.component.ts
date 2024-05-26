import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { CategoryService } from '../../Services/category.service';
import { Medicine } from '../../models/medicine';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  //All medicines in JsonServer
  medicineJsonData: any[] = [];
  // medicineModel
  medicine: Medicine = {} as Medicine;

  updateMode: boolean = false;

  URL: string = '';

  categoriesJsonData: any[] = [];

  categoryNames: any[] = [];

  addMediceneForm: FormGroup; //new
  images: any;

  currentPage: number = 1; // Initialize current page to 1
  itemsPerPage: number = 10; // Set items per page to 10

  // Method to calculate total number of pages
  getTotalPages(): number {
    return Math.ceil(this.medicineJsonData.length / this.itemsPerPage);
  }

  // Method to get the current page of medicines
  getCurrentPageMedicines(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.medicineJsonData.slice(startIndex, endIndex);
  }

  // Method to change current page
  changePage(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  constructor(
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private formbuilder: FormBuilder
  ) {
    if (!this.updateMode) {
      this.addMediceneForm = this.formbuilder.group({
        name: new FormControl('', [
          Validators.required,
          // Validators.minLength(6),
        ]),
        price: new FormControl('', [Validators.required]),

        image: new FormControl('', [Validators.required]),
        mfgDate: new FormControl('', [Validators.required]),
        expDate: new FormControl('', [Validators.required]),
        company: new FormControl('', [Validators.required]),
        activeSubstance: new FormControl('', [Validators.required]),
        category: new FormControl('', [Validators.required]),
        stock: new FormControl('', [Validators.required]),
      });
    } else {
      this.addMediceneForm = this.formbuilder.group({
        name: new FormControl('', [
          Validators.required,
          // Validators.minLength(6),
        ]),
        price: new FormControl('', [Validators.required]),

        image: new FormControl('', [Validators.required]),

        company: new FormControl('', [Validators.required]),

        stock: new FormControl('', [Validators.required]),
      });
    }
  }

  get name() {
    return this.addMediceneForm.get('name');
  }

  get image() {
    return this.addMediceneForm.get('image');
  }

  get mfgDate() {
    return this.addMediceneForm.get('mfgDate');
  }

  get expDate() {
    return this.addMediceneForm.get('expDate');
  }

  get company() {
    return this.addMediceneForm.get('company');
  }

  get activeSubstance() {
    return this.addMediceneForm.get('activeSubstance');
  }

  get category() {
    return this.addMediceneForm.get('category');
  }

  get price() {
    return this.addMediceneForm.get('price');
  }

  get stock() {
    return this.addMediceneForm.get('stock');
  }

  // Get All Categories
  getAllCategories() {
    this.categoryService.getAllCategorys().subscribe({
      next: (data: any) => {
        this.categoriesJsonData = data.allCategories;
        this.categoryNames = this.categoriesJsonData.map(
          (category: any) => category.name
        );
      },
    });
  }

  onSelectFile(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]; // Store the file object
      this.images = file;
    }
  }

  getAllMedicines() {
    this.productService.getAllMedicines().subscribe({
      next: (data: any) => {
        this.medicineJsonData = data.allMedicines;
      },
    });
  }

  ngOnInit(): void {
    this.getAllMedicines();
    this.getAllCategories();
  }

  clearForm() {
    this.medicine.name = '';
    this.medicine.price = 0;
    this.medicine.image = '';
    this.medicine.mfgDate = new Date();
    this.medicine.expDate = new Date();
    this.medicine.company = '';
    this.medicine.activeSubstance = '';
    this.medicine.category = '';
    this.medicine.stock = 0;
  }

  addMedicene() {
    const formData = new FormData();

    formData.append('image', this.images); // Append the file to FormData
    formData.append('name', this.name?.value); // Append the value of the form control

    formData.append('mfgDate', this.mfgDate?.value);
    formData.append('expDate', this.expDate?.value);
    formData.append('company', this.company?.value);
    formData.append('category', this.category?.value);
    formData.append('price', this.price?.value);
    formData.append('stock', this.stock?.value);
    formData.append('activeSubstance', this.activeSubstance?.value);

    console.log(formData);

    this.productService.addMedicine(formData).subscribe({
      next: (data: any) => {
        if (data && data.newMedicine) {
          this.medicine = data.newMedicine;
          this.medicineJsonData.push(data.newMedicine);
          this.getAllMedicines();
          console.log('Data success');
          this.addMediceneForm.reset();
          this.clearForm();
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
    const selectedMedicine = this.medicineJsonData.find(
      (medicine) => medicine.name === name
    );

    if (selectedMedicine) {
      this.updateMode = true;
      // Copy selected medicine to the form model
      this.medicine = { ...selectedMedicine };
      console.log(selectedMedicine);
      console.log(this.medicine.name);
      console.log(this.name?.value);

      // Set form fields with selected medicine values

      this.addMediceneForm.patchValue({
        // Populate all form fields with selected medicine details
        name: this.medicine.name,

        price: this.medicine.price,
        image: this.medicine.image,

        company: this.medicine.company,
        stock: this.medicine.stock,
      });
    }
  }

  updateMedicene() {
    const id = this.medicine._id;

    const formData = new FormData();

    formData.append('image', this.images); // Append the file to FormData
    formData.append('name', this.name?.value); // Append the value of the form control
    formData.append('company', this.company?.value);
    formData.append('price', this.price?.value);
    formData.append('stock', this.stock?.value);

    if (id) {
      this.productService.updateMedicine(id, formData).subscribe({
        next: () => {
          this.updateMode = false;
          this.getAllMedicines();
          // this.updateMediceneForm.reset();
          this.addMediceneForm.reset();
        },
        error: (error) => {
          console.error('Error updating medicine:', error);
          // Handle error
        },
      });
    }
  }

  deleteMedicene(name: string) {
    if (confirm('are You sure for delete ?')) {
      this.productService.deleteMedicine(name).subscribe({
        next: (data) => {
          this.getAllMedicines();
        },
      });
    } else {
      this.getAllMedicines();
    }
  }
}
