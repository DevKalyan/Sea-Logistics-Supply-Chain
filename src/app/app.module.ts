import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import  {FormsModule} from '@angular/forms'
import { HomeComponent } from './modules/home/components/home/home.component';
import { TopnavComponent } from './shared/components/mastertheme/topnav/topnav.component';
import { AsidenavComponent } from './shared/components/mastertheme/asidenav/asidenav.component';
import { FooterComponent } from './shared/components/mastertheme/footer/footer.component';
import { NewEmployeeComponent } from './modules/auth/components/new-employee/new-employee.component';
import { ViewEmployeesComponent } from './modules/auth/components/view-employees/view-employees.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ChangePasswordComponent } from './modules/auth/components/change-password/change-password.component';
@NgModule({
  declarations: [
    AppComponent,  
    HomeComponent,
    LoginComponent,
    TopnavComponent, 
    AsidenavComponent, 
    FooterComponent, 
    NewEmployeeComponent, ViewEmployeesComponent, ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    BrowserAnimationsModule,MatNativeDateModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    NgxWebstorageModule.forRoot() 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
