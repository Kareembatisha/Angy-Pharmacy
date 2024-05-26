import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Iuser } from '../../models/iuser';
import { UserService } from '../../Services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = ''; // Property to hold the error message

  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private _userService: UserService
  ) {
    this.registerForm = this.formbuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@(gmail|yahoo)\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }
  user: Iuser = {} as Iuser;
  register() {
    // Your registration logic here
    this.user.name = this.name?.value;
    this.user.email = this.email?.value;
    this.user.password = this.password?.value;

    this._userService.register(this.user).subscribe({
      next: () => {
        this.router.navigate(['/signin']);
        console.log(this.user);
        console.log('tmaaam');
      },
      error: (err: any) => {
        if (err instanceof HttpErrorResponse) {
          this.errorMessage = err.error.message; // Set the error message
          alert(this.errorMessage);
        } else {
          this.errorMessage = 'An error occurred during login';
        }
      },
    });
  }

  signIn() {
    // Your sign-in logic here
    // Assuming successful sign-in, navigate to the desired component
    this.router.navigate(['/signin']); // Change '/product' to your desired route
  }
  ngOnInit(): void {}
}
