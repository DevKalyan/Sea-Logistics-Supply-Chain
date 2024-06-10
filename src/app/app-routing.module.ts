import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/components/home/home.component';
import { NewEmployeeComponent } from './modules/auth/components/new-employee/new-employee.component';
import { ViewEmployeesComponent } from './modules/auth/components/view-employees/view-employees.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { ChangePasswordComponent } from './modules/auth/components/change-password/change-password.component';
import { ChangepasswordGuard } from './core/guards/auth/changepassword.guard';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route

  // Main menu routes
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard,ChangepasswordGuard] },

  // Admin menu route with child routes
  {
    path: 'admin',
    canActivate: [AuthGuard], // Protect admin route and child routes
    children: [
      { path: 'new-employee', component: NewEmployeeComponent,canActivate :[ChangepasswordGuard] },
      { path: 'view-employees', component: ViewEmployeesComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      // Add other child routes for admin submenu items here
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
