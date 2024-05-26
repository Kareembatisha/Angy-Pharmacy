import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { ProductComponent } from './Components/product/product.component';
import { CategoryComponent } from './Components/category/category.component';
import { UserComponent } from './Components/user/user.component';
import { ChatComponent } from './Components/chat/chat.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { RegisterComponent } from './Components/register/register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    SidebarComponent,
    ProductComponent,
    CategoryComponent,
    UserComponent,
    ChatComponent,
    DashboardComponent,
    SignInComponent,
    RegisterComponent
  ],
})
export class AppComponent {
  title = 'Dashboard';
  constructor(private router: Router) {}

  isSignInPage(): boolean {
    return this.router.url === '/signin';
  }
  isregisterPage(): boolean {
    return this.router.url === '/register';
  }
}
