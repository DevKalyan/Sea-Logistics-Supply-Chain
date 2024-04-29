import { Component, OnInit } from '@angular/core';
import { AuthloginModel } from 'src/app/core/models/auth.model';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
   _loginDetails: AuthloginModel = {
    UserName: '',
    PassWord: ''
};
constructor(private authService : AuthService,private router: Router) { }
  
ngOnInit(): void {
  }

  validateUserDetails() {
    this.authService.validateUserDetails(this._loginDetails.UserName, this._loginDetails.PassWord)
      .subscribe(
        isAuthenticated => {
          if (isAuthenticated) {
            // Authentication successful, perform necessary actions (e.g., navigate to another page)
            console.log('Authentication successful');
            this.router.navigate(['/home']);
          } else {
            // Authentication failed, handle accordingly (e.g., display error message)
            console.error('Authentication failed');
            this.router.navigate(['/login']);
          }
        },
        error => {
          // Handle any errors that might occur during the authentication process
          console.error('Error validating user details:', error);
        }
      );
  }
}
