import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import  {FormsModule} from '@angular/forms'
import { HomeComponent } from './modules/home/components/home/home.component';
import { TopnavComponent } from './shared/components/mastertheme/topnav/topnav.component';
import { AsidenavComponent } from './shared/components/mastertheme/asidenav/asidenav.component';
import { FooterComponent } from './shared/components/mastertheme/footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,  
    HomeComponent,
    LoginComponent,TopnavComponent, AsidenavComponent, FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
