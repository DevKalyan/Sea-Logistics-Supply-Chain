import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/components/home/home.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { AuthGuard } from './core/guards/auth/auth.guard';



const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect root to home if authenticated
  { path: '**', redirectTo: '/home' } // Redirect unmatched routes to home if authenticated
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
