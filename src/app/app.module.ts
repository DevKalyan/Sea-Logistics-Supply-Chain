import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainHeaderComponent } from './shared/components/main-header/main-header.component';
import { MainSidebarComponent } from './shared/components/main-sidebar/main-sidebar.component';
import { ContentWrapperComponent } from './shared/components/content-wrapper/content-wrapper.component';
import { ControlSidebarComponent } from './shared/components/control-sidebar/control-sidebar.component';
import { MainFooterComponent } from './shared/components/main-footer/main-footer.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import  {FormsModule} from '@angular/forms'
import { FormStyle } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    MainSidebarComponent,
    ContentWrapperComponent,
    ControlSidebarComponent,
    MainFooterComponent,    
    LoginComponent
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
