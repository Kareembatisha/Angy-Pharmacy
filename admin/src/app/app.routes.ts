import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { ProductComponent } from './Components/product/product.component';
import { CategoryComponent } from './Components/category/category.component';
import { UserComponent } from './Components/user/user.component';
import { NotFoundPageComponent } from './Components/not-found-page/not-found-page.component';
import { ChatComponent } from './Components/chat/chat.component';
import { OrderComponent } from './Components/order/order.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './Components/register/register.component';
import { authGuard } from './Guard/auth.guard';

export const routes: Routes = [
  { path: 'signin', component: SignInComponent, title: 'signin' },
  { path: 'register', component: RegisterComponent, title: 'signup' },
  {
    path: 'sidebar',
    component: SidebarComponent,
    title: 'Sidebar',
    canActivate: [authGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
    canActivate: [authGuard],
  },
  {
    path: 'product',
    component: ProductComponent,
    title: 'Product',
    canActivate: [authGuard],
  },
  {
    path: 'category',
    component: CategoryComponent,
    title: 'Category',
    canActivate: [authGuard],
  },
  {
    path: 'chat',
    component: ChatComponent,
    title: 'Chat',
    canActivate: [authGuard],
  },
  {
    path: 'order',
    component: OrderComponent,
    title: 'Order',
    canActivate: [authGuard],
  },
  {
    path: 'user',
    component: UserComponent,
    title: 'User',
    canActivate: [authGuard],
  },
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent, title: 'Not Found' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
