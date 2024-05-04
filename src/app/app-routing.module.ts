import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/components/home/home.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { AppComponent } from './app.component';



const routes: Routes = [
  
  { 
    path: '', 
    canActivate: [AuthGuard], // Protect the home page
    children: [
      { 
        path: '', 
        component: HomeComponent, 
        pathMatch: 'full' 
      }
    ]
  }
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
