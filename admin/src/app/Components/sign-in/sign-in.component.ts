import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { Iuser } from '../../models/iuser';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, NgClass],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  loginForm: FormGroup;
  errorMessage: string = ''; // Property to hold the error message

  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private _userService: UserService
  ) {
    this.loginForm = this.formbuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@(gmail|yahoo)\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
  user: Iuser = {} as Iuser;

  login() {
    if (this.email?.value && this.password?.value) {
      console.log(this.email.value, this.password.value);

      this.user.email = this.email?.value;
      this.user.password = this.password?.value;

      this._userService.login(this.user).subscribe({
        next: () => {
          console.log(this.user);
          this.router.navigate(['/product']);
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
  }

  signIn() {
    // Your sign-in logic here
    // Assuming successful sign-in, navigate to the desired component
    this.router.navigate(['/product']); // Change '/product' to your desired route
  }

  signUpUser() {
    this.router.navigate(['/register']); // Navigate to the register component
  }
}
