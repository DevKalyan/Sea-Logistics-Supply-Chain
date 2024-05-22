import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/components/home/home.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { AppComponent } from './app.component';
import { NewEmployeeComponent } from './modules/auth/components/new-employee/new-employee.component';
import { ViewEmployeesComponent } from './modules/auth/components/view-employees/view-employees.component';



const routes: Routes = [
  { 
    path: '',component: HomeComponent,    
  },
  {     
    path: 'new-employee', component: NewEmployeeComponent     
  },
  {path :'view-employees',component :ViewEmployeesComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
