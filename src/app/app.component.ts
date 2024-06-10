import { Component } from '@angular/core';
import { AuthService } from './modules/auth/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SLM-User-Management';
  _isLoggedin : boolean=false;
  constructor (private authService: AuthService){}
  
  isAuthenticated(): boolean {
    return this._isLoggedin = this.authService.getIsAuthenticated();
  }

}
